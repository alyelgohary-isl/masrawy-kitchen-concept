/* Site motion extras: the hover "peek" image on menu rows, the day-to-night dial under the
   room scrub, and pausing the marquee off-screen. Progressive: nothing here is required to read the page. */
(function () {
  /* Peek: a photo that follows the cursor over a list of dishes (pointer devices only) */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll("[data-peek]").forEach((list) => {
      const img = list.parentElement.querySelector(".peek");
      if (!img) return;
      let x = 0, y = 0, tx = 0, ty = 0, raf = null, on = false;
      const tick = () => {
        x += (tx - x) * 0.18; y += (ty - y) * 0.18;
        img.style.transform = `translate(${x}px, ${y}px) rotate(${(tx - x) * 0.03}deg)`;
        if (on || Math.abs(tx - x) > 0.5) raf = requestAnimationFrame(tick); else raf = null;
      };
      list.querySelectorAll("[data-img]").forEach((row) => {
        row.addEventListener("mouseenter", () => { img.src = row.dataset.img; img.classList.add("show"); on = true; if (!raf) raf = requestAnimationFrame(tick); });
        row.addEventListener("mouseleave", () => { img.classList.remove("show"); on = false; });
      });
      list.addEventListener("mousemove", (e) => { tx = e.clientX + 24; ty = e.clientY - 120; });
    });
  }

  /* Marquee: only animate while visible */
  const mq = document.querySelectorAll(".marquee");
  if (mq.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("running", e.isIntersecting)), { threshold: 0 });
    mq.forEach((m) => io.observe(m));
  }

  /* Dial labels get .is-active from scroll-scrub.js via data-at; nothing to do here. */
})();
