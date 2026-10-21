/* Sofra engine: one rAF loop maps the section's scroll progress (0..1) onto every
   layer and caption. Nothing is time-based, so scrubbing backwards is exact and
   text and image share one clock. */
import { smoothScroll } from "./smooth-scroll.js";

const root = document.querySelector("[data-sofra]");
if (root) init(root);

function init(sofra) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dishes = [...sofra.querySelectorAll(".dish:not(.base)")];
  const caps = [...sofra.querySelectorAll(".cap")];
  const overs = [...sofra.querySelectorAll(".over")];
  const table = sofra.querySelector(".table");
  const hint = sofra.querySelector(".hint");
  const bar = sofra.querySelector(".progress b");

  if (reduced) { sofra.classList.add("static"); return; }
  smoothScroll();

  /* Timeline in progress units. Each dish lands over LAND; its caption fades in once the
     dish is ~45% landed and fades out when the next one reaches the same point. */
  const START = 0.10, STEP = 0.105, LAND = 0.055, FADE = 0.022;
  const HANDS = 0.78, ROOM = 0.90;
  const beats = dishes.map((el, i) => ({ el, at: START + i * STEP }));
  const capIn = (i) => beats[i].at + LAND * 0.45;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (t) => t * t * (3 - 2 * t);
  const outBack = (t) => { const c = 1.2; return 1 + c * Math.pow(t - 1, 3) + (c - 1) * Math.pow(t - 1, 2); };
  const win = (p, a, b) => smooth(clamp((p - a) / FADE, 0, 1)) * (1 - smooth(clamp((p - b) / FADE, 0, 1)));

  let last = -1;
  function frame() {
    const rect = sofra.getBoundingClientRect();
    const vh = innerHeight;
    const p = clamp(-rect.top / (rect.height - vh), 0, 1);
    if (p !== last) {
      last = p;
      bar.style.width = (p * 100) + "%";

      beats.forEach((b) => {
        const t = clamp((p - b.at) / LAND, 0, 1);
        const e = outBack(smooth(t));
        b.el.style.opacity = clamp(t * 2.2, 0, 1);
        b.el.style.transform = `translate(-50%,-50%) translateY(${(1 - e) * -26}px) scale(${1.16 - 0.16 * e})`;
      });

      // captions: intro until the first dish is down; each dish caption until the next lands; none past the hand-over
      caps.forEach((c) => {
        const i = +c.dataset.beat;
        const a = i === 0 ? -1 : capIn(i - 1);
        const b = i === beats.length ? HANDS - 0.03 : capIn(i);
        const o = win(p, a, b);
        c.style.opacity = o;
        c.style.transform = `translateY(${(1 - o) * 14}px)`;
        c.style.pointerEvents = o > 0.5 ? "auto" : "none";
      });

      // hand-over: the laid table dips through the dark ground, then the real table rises, then the room
      const tOut = smooth(clamp((p - HANDS) / 0.035, 0, 1));
      const h = smooth(clamp((p - HANDS - 0.03) / 0.045, 0, 1));
      const r = smooth(clamp((p - ROOM) / 0.07, 0, 1));
      table.style.opacity = 1 - tOut;
      table.style.transform = `scale(${1 + 0.05 * tOut})`;
      overs[0].style.opacity = h;
      overs[0].querySelector(".line").style.opacity = 1 - r;
      overs[1].style.opacity = r;
      overs[1].style.pointerEvents = r > 0.8 ? "auto" : "none";
      hint.style.opacity = p < 0.04 ? 1 : 0;
    }
    document.body.classList.toggle("past-film", rect.bottom < 80);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
