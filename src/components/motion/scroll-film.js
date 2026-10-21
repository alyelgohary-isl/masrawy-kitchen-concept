/* Scroll film engine. Pins a canvas to the viewport and scrubs it through a
   frame sequence as the page scrolls down a tall runway, while text sections
   ("beats") in the band fade and animate in at set points of the film.

   Every [data-scroll-film] root on the page is initialised from the JSON in
   its data-config (written by ScrollFilm.astro). The film is full-viewport
   and fixed, so use one per page. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScroll } from "./smooth-scroll.js";
import { framePath, loadImage } from "./frames.js";

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll("[data-scroll-film]").forEach((root) => initScrollFilm(root, JSON.parse(root.dataset.config)));

function initScrollFilm(root, cfg) {
  const { radius, headerOffset } = cfg;
  const bleed = cfg.layout === "bleed";   // film fills the viewport; square frames float on the ground, wide frames cover
  const ground = cfg.ground || getComputedStyle(document.body).backgroundColor;   // the card sits on the page ground

  /* ——— Film sources + timeline ———
     Sources are concatenated into one frame list. Each timeline segment maps a
     slice of scroll progress onto a frame range; segment lengths are relative
     "units", normalised to 0..1 here, so adding a clip never breaks the others.
     Band sections reference segments by id: data-seg="clip1:0.15,clip1:0.95". */
  const FILES = [];
  const OFFSET = {};
  for (const [key, src] of Object.entries(cfg.sources)) {
    OFFSET[key] = FILES.length;
    for (let i = 0; i < src.count; i++) FILES.push(framePath(src.dir + src.prefix, i, src.ext));
  }
  const F = ([src, i]) => {
    if (!(src in OFFSET)) console.warn("scroll film: unknown source", src);
    return OFFSET[src] + i;
  };
  const FRAME_COUNT = FILES.length;

  const TIMELINE = cfg.timeline.map((s) => {
    const [from, to] = s.hold ? [s.hold, s.hold] : [s.from, s.to];
    return { id: s.id, units: s.units, f0: F(from), f1: F(to) };
  });
  {
    const total = TIMELINE.reduce((a, s) => a + s.units, 0);
    let acc = 0;
    for (const s of TIMELINE) { s.p0 = acc / total; acc += s.units; s.p1 = acc / total; }
  }
  const SEG = Object.fromEntries(TIMELINE.map((s) => [s.id, s]));
  /* "clip1:0.15" → progress 15% of the way into segment clip1 */
  function at(ref) {
    const [id, frac] = ref.trim().split(":");
    const s = SEG[id];
    if (!s) { console.warn("scroll film: unknown segment", id); return 0; }
    return s.p0 + (parseFloat(frac ?? "0")) * (s.p1 - s.p0);
  }

  const OVERLAY = cfg.overlay && { enter: at(cfg.overlay.enter), leave: at(cfg.overlay.leave), max: cfg.overlay.max, fade: cfg.overlay.fade };
  const MARQUEE = cfg.marquee && { enter: at(cfg.marquee.enter), leave: at(cfg.marquee.leave) };

  const lenis = smoothScroll();

  /* ——— Canvas ——— */

  const canvas = root.querySelector(".canvas-wrap canvas");
  const ctx = canvas.getContext("2d");
  const frames = new Array(FRAME_COUNT).fill(null);
  let currentFrame = 0;
  let dpr = 1;

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    publishSquareRect();
  }

  /* Frame placement. The film is square; the page is not. On landscape
     screens the frame is anchored to the right and the text lives on the
     solid ground to its left. On portrait screens it sits in the lower part
     of the viewport under the text. No blur, no feathering: a clean card. */
  /* Bleed layout. One scale and one anchor for every frame, so a cut between a wide
     clip and a square clip never moves the subject: the "square" is the centre square
     of a 16:9 frame. Landscape: the square is sized to cover the viewport with a 16:9
     frame (never smaller than the viewport height, capped so ultra-wide screens crop
     the square by at most 25%), its centre sits at 56% of the width (copy lives in
     the left margin) and the whole thing is clamped so a wide frame never leaves a
     gap. Wide frames are drawn at that scale; square frames occupy the centre square
     and float on the ground. Portrait: the centre square goes in the bottom card. */
  function bleedRect(iw, ih) {
    const cw = canvas.width, ch = canvas.height;
    const landscape = cw > ch * 1.05;
    if (!landscape) {
      const size = Math.min(cw * 0.94, ch * 0.38);
      return { dx: (cw - size) / 2, dy: ch - size - ch * 0.03, dw: size, dh: size, crop: true };
    }
    const S = Math.min(Math.max(ch, cw * 9 / 16), ch * 1.25);   // the square's size on screen
    const W = S * 16 / 9;                                        // a 16:9 frame at that scale
    let wx = cw * 0.56 - W / 2;
    wx = W >= cw ? Math.min(0, Math.max(cw - W, wx)) : Math.max(0, Math.min(cw - W, wx));
    const wy = (ch - S) / 2;
    const sx = wx + (W - S) / 2;
    if (iw > ih * 1.2) return { dx: wx, dy: wy, dw: W, dh: S, crop: false, square: false };
    return { dx: sx, dy: wy, dw: S, dh: S, crop: false, square: true };
  }
  function publishSquareRect() {
    const r = bleedRect(1, 1);
    const el = root.querySelector(".band") || root;
    el.style.setProperty("--card-x", r.dx / dpr + "px");
    el.style.setProperty("--card-y", r.dy / dpr + "px");
    el.style.setProperty("--card-size", r.dw / dpr + "px");
  }
  function frameRect() {
    const cw = canvas.width, ch = canvas.height;
    const landscape = cw > ch * 1.05;
    if (landscape) {
      // sits below the fixed header, with a slimmer margin at the bottom
      const top = headerOffset * dpr, bottom = Math.max(24 * dpr, ch * 0.04);
      const size = Math.min(ch - top - bottom, cw * 0.56);
      const margin = cw * 0.03;
      return { dx: cw - size - margin, dy: top, dw: size, dh: size };
    }
    const size = Math.min(cw * 0.94, ch * 0.38);
    return { dx: (cw - size) / 2, dy: ch - size - ch * 0.03, dw: size, dh: size };
  }

  function roundedPath(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawFrame(index) {
    let img = frames[index];
    for (let k = index; !img && k >= 0; k--) img = frames[k];   // nearest frame already loaded
    if (!img) return;
    const cw = canvas.width, ch = canvas.height;
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, cw, ch);
    if (bleed) {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const r = bleedRect(iw, ih);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      if (r.crop) {
        const s = Math.min(iw, ih);
        ctx.drawImage(img, (iw - s) / 2, (ih - s) / 2, s, s, r.dx, r.dy, r.dw, r.dh);
      } else {
        ctx.drawImage(img, r.dx, r.dy, r.dw, r.dh);
        if (r.square) {
          // square frame floating on the ground: feather its sides so the edge never reads
          const f = r.dw * 0.03;
          for (const [x0, x1] of [[r.dx, r.dx + f], [r.dx + r.dw, r.dx + r.dw - f]]) {
            const g = ctx.createLinearGradient(x0, 0, x1, 0);
            g.addColorStop(0, ground); g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g; ctx.fillRect(Math.min(x0, x1), r.dy, Math.abs(x1 - x0), r.dh);
          }
        }
      }
      return;
    }
    const { dx, dy, dw, dh } = frameRect();
    ctx.save();
    roundedPath(dx, dy, dw, dh, radius * dpr);
    ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  function progressToFrame(p) {
    for (const s of TIMELINE) {
      if (p >= s.p0 && p <= s.p1) {
        const t = s.p1 === s.p0 ? 0 : (p - s.p0) / (s.p1 - s.p0);
        return Math.round(s.f0 + t * (s.f1 - s.f0));
      }
    }
    return p < 0 ? 0 : FRAME_COUNT - 1;
  }

  /* ——— Preloader ——— */

  const loaderEl = root.querySelector(".film-loader");
  const loaderBar = root.querySelector(".loader-bar");
  const loaderPct = root.querySelector(".loader-percent");
  const FIRST_CHUNK = Math.min(FRAME_COUNT, F(cfg.preload));   // frames that must be in before the page shows
  let loaded = 0;

  function loadFrame(i) {
    return loadImage(FILES[i]).then((img) => {
      frames[i] = img;
      loaded++;
      if (loaderEl) {
        const pct = Math.min(100, Math.round((loaded / FIRST_CHUNK) * 100));
        loaderBar.style.width = pct + "%";
        loaderPct.textContent = pct;
      }
    });
  }

  let nextToLoad = 0;
  function loadNext() {
    if (nextToLoad >= FRAME_COUNT) return;
    const i = nextToLoad++;
    loadFrame(i).then(() => {
      if (i === currentFrame) requestAnimationFrame(() => drawFrame(currentFrame));
      loadNext();
    });
  }
  async function preload() {
    await Promise.all([...Array(FIRST_CHUNK).keys()].map(loadFrame));
    nextToLoad = FIRST_CHUNK;
    sizeCanvas();
    drawFrame(0);
    if (loaderEl) loaderEl.classList.add("done");
    playHeroIntro();
    for (let k = 0; k < 6; k++) loadNext();   // stream the rest, six at a time, in scroll order
  }

  /* ——— Band sections ——— */

  const bandSections = [...root.querySelectorAll(".band-section")];
  const sectionState = new Map();

  function buildTimeline(section) {
    const type = section.dataset.animation;
    const children = section.querySelectorAll(cfg.items);
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => section.classList.remove("is-active"),
    });
    if (!children.length) return tl;
    switch (type) {
      case "slide-left":
        tl.from(children, { x: -80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
        break;
      case "slide-right":
        tl.from(children, { x: 80, opacity: 0, stagger: 0.14, duration: 0.9, ease: "power3.out" });
        break;
      case "clip-reveal":
        tl.from(children, { clipPath: "inset(0 0 100% 0)", y: 30, opacity: 0, stagger: 0.15, duration: 1.1, ease: "power4.inOut" });
        break;
      case "fade-up":
        tl.from(children, { y: 50, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
        break;
      case "rotate-in":
        tl.from(children, { y: 40, rotation: 2.5, transformOrigin: "left bottom", opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" });
        break;
      case "stagger-up":
        tl.from(children, { y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" });
        break;
      case "hero":
        break; // built separately on load; scroll only fades it
    }
    return tl;
  }

  bandSections.forEach((s) => {
    const [enterRef, leaveRef] = s.dataset.seg.split(",");
    sectionState.set(s, {
      enter: at(enterRef),
      leave: at(leaveRef),
      seg: SEG[enterRef.trim().split(":")[0]],
      tl: buildTimeline(s),
      hasCounters: !!s.querySelector(".stat-number[data-value]"),
      countersFired: false,
    });
  });

  /* The hero is the section on screen at load. It plays an intro once the
     first frames are in, then fades out across its own segment. */
  const heroSection = root.querySelector('.band-section[data-animation="hero"]');

  function playHeroIntro() {
    if (!heroSection) return;
    const q = (sel) => heroSection.querySelectorAll(sel);
    const steps = [
      [q(".eyebrow"), { y: 14, opacity: 0, duration: 0.6, ease: "power3.out" }],
      [q(".hero-heading .word"), { yPercent: 115, duration: 1.1, stagger: 0.06, ease: "power4.out" }, "-=0.3"],
      [q(".hero-tagline"), { y: 26, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.55"],
      [q(".hero-ctas .btn"), { y: 20, opacity: 0, stagger: 0.09, duration: 0.7, ease: "power3.out" }, "-=0.5"],
      [q(".badge-strip"), { opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.3"],
    ];
    const tl = gsap.timeline();
    steps.forEach(([els, vars, pos]) => { if (els.length) tl.from(els, vars, pos); });
  }

  function fireCounters(scope) {
    scope.querySelectorAll(".stat-number[data-value]").forEach((el) => {
      if (el.hasAttribute("data-static")) return;   // years, codes: never count up
      const target = parseFloat(el.dataset.value);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: target,
        duration: 1.8,
        ease: "power1.out",
        snap: { textContent: decimals === 0 ? 1 : 0.1 },
        onUpdate() { el.textContent = parseFloat(el.textContent).toFixed(decimals); },
      });
    });
  }

  function updateBand(p) {
    bandSections.forEach((s) => {
      const st = sectionState.get(s);
      const inRange = p >= st.enter && p <= st.leave;
      if (s === heroSection) {
        const h = st.seg;
        const o = gsap.utils.clamp(0, 1, 1 - (p - (h.p0 + 0.12 * (h.p1 - h.p0))) / (0.65 * (h.p1 - h.p0)));
        s.style.opacity = o;
        s.classList.toggle("is-active", o > 0.01);
        return;
      }
      if (inRange) {
        if (!s.classList.contains("is-active")) {
          s.classList.add("is-active");
          st.tl.timeScale(1).play();
          if (st.hasCounters && !st.countersFired) {
            st.countersFired = true;
            fireCounters(s);
          }
        }
      } else if (s.classList.contains("is-active")) {
        if (st.tl.duration() === 0) s.classList.remove("is-active");   // no tween to reverse
        else st.tl.timeScale(1.8).reverse();
        if (st.hasCounters) st.countersFired = false;
      }
    });
  }

  /* ——— Overlay + marquee ——— */

  const overlayEl = root.querySelector(".film-overlay");
  const marqueeEl = root.querySelector(".marquee-wrap");
  const marqueeText = marqueeEl && marqueeEl.querySelector(".marquee-text");

  function updateOverlay(p) {
    if (!OVERLAY) return;
    const { enter, leave, max, fade } = OVERLAY;
    let o = 0;
    if (p >= enter - fade && p < enter) o = max * ((p - (enter - fade)) / fade);
    else if (p >= enter && p <= leave) o = max;
    else if (p > leave && p <= leave + fade) o = max * (1 - (p - leave) / fade);
    overlayEl.style.opacity = o;
  }

  function updateMarquee(p) {
    if (!MARQUEE) return;
    const { enter, leave } = MARQUEE;
    const span = 0.025;
    let o = 0;
    if (p >= enter && p <= leave) o = Math.min(1, (p - enter) / span, (leave - p) / span);
    marqueeEl.style.opacity = o;
    if (o > 0) {
      const t = (p - enter) / (leave - enter);
      gsap.set(marqueeText, { xPercent: -8 - t * 30 });
    }
  }

  /* ——— Master scroll binding ——— */

  const runway = root.querySelector(".film-runway");

  ScrollTrigger.create({
    trigger: runway,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate(self) {
      const p = self.progress;
      const index = progressToFrame(p);
      if (index !== currentFrame) {
        currentFrame = index;
        requestAnimationFrame(() => drawFrame(currentFrame));
      }
      updateBand(p);
      updateOverlay(p);
      updateMarquee(p);
    },
  });

  /* Hide the film once the content after it has scrolled over it */
  const layers = [".canvas-wrap", ".band", ".film-overlay", ".marquee-wrap"].map((sel) => root.querySelector(sel)).filter(Boolean);
  const [canvasWrap, band] = layers;
  const header = cfg.header && document.querySelector(cfg.header);
  const release = cfg.release && document.querySelector(cfg.release);
  if (release) {
    ScrollTrigger.create({
      trigger: release,
      start: "top 60%",
      onEnter: () => {
        gsap.to(layers, { autoAlpha: 0, duration: 0.4 });
        if (header) header.classList.add("solid");
      },
      onLeaveBack: () => {
        gsap.to([canvasWrap, band], { autoAlpha: 1, duration: 0.4 });
        gsap.set(layers.slice(2), { visibility: "visible" });
        if (header) header.classList.remove("solid");
      },
    });
  }

  /* ——— Same-page anchors through the runway (Lenis) ——— */

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      if (href === "#top") return lenis.scrollTo(0, { duration: 1.6 });
      const el = document.querySelector(href);
      if (el) lenis.scrollTo(el, { offset: -80, duration: 1.6 });
    });
  });

  /* ——— Resize ——— */

  window.addEventListener("resize", () => {
    sizeCanvas();
    drawFrame(currentFrame);
  });

  /* ——— QA hook: ?p=0.42 jumps straight to that film progress after preload ——— */

  function jumpToProgress() {
    const q = new URLSearchParams(location.search).get("p");
    if (q === null) return;
    const p = Math.min(1, Math.max(0, parseFloat(q)));
    const y = p * (runway.offsetHeight - window.innerHeight);
    lenis.scrollTo(y, { immediate: true });
    window.scrollTo(0, y);
    ScrollTrigger.refresh();
  }

  // read by tools/shoot.mjs
  window.scrollFilm = { get frame() { return currentFrame; }, frames: FRAME_COUNT, at };

  /* ——— Go ——— */

  sizeCanvas();
  preload().then(jumpToProgress);
}
