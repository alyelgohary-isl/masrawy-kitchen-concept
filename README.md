# Motion site template

The engine, styles and tooling behind the Stallion Developments site, stripped of its content, as an [Astro](https://astro.build) project. A new site is: this template + a copy doc + brand tokens + generated film frames. The `motion-website` skill drives the whole process; this README is the map.

```sh
tools/new-site.sh ~/Islands/<site>     # scaffold + npm install
npm run dev                            # http://localhost:8014/
npm run build                          # static site in dist/
```

## Layout

```
src/site.config.ts             brand, domain, email, nav, CTA, footer, fonts, favicon, schema, tracking: everything per client
src/styles/style.css           tokens at the top (retheme here), then every component the pages use
src/layouts/Layout.astro       head tags, Organization JSON-LD, header, footer, site scripts
src/pages/index.astro          home: <ScrollFilm> with the text beats, then the page flow
src/pages/about/               the inner-page template (three hero variants); copy the folder per page
src/pages/contact/, legal/     contact with route cards + form, legal
src/data/film.ts               the home film: frame sources, timeline, preload, overlay, marquee
src/components/motion/
  ScrollFilm.astro             full-viewport scroll-scrubbed frame film (never edit per site; configure via props)
  ScrollScrub.astro            canvas scrub for inner-page heroes (sticky seasons card)
  HeroLoop.astro               muted ambient video behind a page hero
src/scripts/site.js            nav, reveal-on-scroll, counters, forms (Formspree + reCAPTCHA v3 + honeypot, form_success conversion event)
public/js/config.js            site name, form endpoint, reCAPTCHA site key, notify email
public/frames/, public/assets/ film frames, images, loops, served as-is
tools/                         generation + QA + deploy scripts (see below)
.github/workflows/pages.yml    build + deploy to GitHub Pages on push to main
```

Links in pages use `url("contact/")` and assets `url("assets/img/x.webp")` from `@/lib/url`, so they work at any page depth and under any base path. Mark years and codes in stats with `data-static` so they never count up.

## Tracking (GTM, GA4, Search Console)

Three optional IDs, read from the environment at build time and injected by `src/layouts/Layout.astro`. Nothing is edited per site:

| Variable | Injects | Notes |
|---|---|---|
| `PUBLIC_GTM_ID` | GTM snippet in `<head>` + `<noscript>` iframe | Preferred. GA4 and the key event are configured inside the container |
| `PUBLIC_GA4_ID` | gtag.js + `config` | Only used when there is no GTM ID |
| `PUBLIC_GSC_VERIFICATION` | `<meta name="google-site-verification">` | Optional: GSC can also verify through the GTM container or DNS |

Put them in `.env`; `tools/deploy.sh` copies them to the repo's Actions variables, and `.github/workflows/pages.yml` passes those to the build. To change one later, edit the variable on GitHub (Settings → Secrets and variables → Actions → Variables) and re-run the workflow. Snippets are only rendered in production builds, so `npm run dev` never reports visits. On Cloudflare Pages, set the same names as build environment variables.

**Conversions.** After the form endpoint returns 2xx, `src/scripts/site.js` pushes `{ event: "form_success", form_name, form_type }` to the dataLayer. `form_name` is the form's `data-form`; `form_type` is `data-form-type` if set, otherwise the same as `form_name`. In GTM: two Data Layer Variables (`form_name`, `form_type`), a Custom Event trigger on `form_success`, and a GA4 Event tag named `generate_lead` with a `form_name` parameter. Then mark `generate_lead` as a key event in GA4. Without GTM, the gtag fallback sends `generate_lead` directly. With no endpoint configured, forms show their local success state and send no event.

## Base path

GitHub Pages project sites live under `/<repo>/`. The workflow asks GitHub for the base path and builds with it (`BASE_PATH`), so nothing is edited per repo, and a custom domain builds at `/`. Locally the base is `/`. To check a subpath build before deploying:

```sh
export BASE_PATH=/test/ && npm run build && npm run preview   # preview needs BASE_PATH too
```

## Tools

| Script | What it does |
|---|---|
| `tools/setup.sh` | one-time: ffmpeg, cwebp, Node 22.12+, python deps, headless Chromium |
| `tools/new-site.sh <dir>` | scaffold a new site from this template and install dependencies |
| `tools/kie.py image/video` | Nano Banana 2 stills and Kling 3.0 clips via kie.ai (needs `KIE_API_KEY`) |
| `tools/frames.sh clip.mp4 outdir prefix [fps]` | split a clip into square webp frames (`SIZE=800 Q=76` env to shrink) |
| `tools/synth.py push/cross/hold` | synthesize push-ins and dissolves from stills when credits run out |
| `tools/loop.sh in.mp4 out.mp4 [width]` | encode a muted background loop |
| `tools/shoot.mjs dir 0.3 0.6 bottom y900` | screenshots of the film at progress points / scroll offsets (`BASE=`, `VIEWPORT=390x844`) |
| `tools/fullpage.mjs out.png [url]` + `tools/stitch.py out.png` | full-page capture of any page (fixed viewport, stitched) |
| `tools/videocheck.mjs <urls>` | prove background videos are loaded and playing |
| `tools/formtest.mjs <page> "form.form"` | submit a form to a mock endpoint and print what arrived |
| `tools/deploy.sh <owner> <repo>` | check the build, create the repo if needed, copy tracking IDs to repo variables, push, enable Pages, wait for the URL |

The QA tools default to `http://localhost:8014/` (`npm run dev` or `npm run preview`).

## The three tricks that make the films work

1. **Start + end frame.** Kling 3.0 accepts `image_urls[0]` (start) and `image_urls[1]` (end). Leave the film at frame N, generate a clip from frame N to a generated still, play it back reversed in the timeline for the return leg (`from: ["cutaway", 60], to: ["cutaway", 0]`), resume at frame N+1. Nothing in the original film changes.
2. **Same image both ends = seamless loop.** For ambient heroes.
3. **Edit mode for consistency.** Give Nano Banana 2 the client's own render as the first reference and describe only what changes. Never present stock photos of real homes as the client's project.
