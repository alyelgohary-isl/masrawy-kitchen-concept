// @ts-check
import { defineConfig } from "astro/config";

// BASE_PATH is set by the Pages workflow from GitHub's own answer: "/<repo>/"
// on a project site, "/" once a custom domain is attached. Locally it's "/".
// To check a subpath build before deploying: BASE_PATH=/test/ npm run build && npm run preview
const base = process.env.BASE_PATH || "/";
const b = base.replace(/\/$/, "");

/* Every URL the old WordPress site exposed (from its sitemaps and PDFs), mapped to
   the page that replaces it. Static output turns each into a meta-refresh page;
   public/_redirects carries the same map as real 301s for Netlify/Cloudflare,
   and the launch checklist has the nginx/.htaccess version. */
const OLD = {
  "/blog/": "/our-story/#press",
  "/masrawy/blog/": "/our-story/#press",
  "/reviews/": "/our-story/#press",
  "/reservation/": "/reserve/",
  "/category/healthy-food/": "/our-story/#press",
  "/category/interview/": "/our-story/#press",
  "/category/media-coverage/": "/our-story/#press",
  "/category/news/": "/our-story/#press",
  "/category/review/": "/our-story/#press",
  "/healthy-food/quote-2/": "/our-story/",
  "/mai-mama-wafaa-event/": "/the-room/",
  "/media-coverage/shifting-restaurant-spotlight-masrawy-egyptian-kitchen/": "/our-story/#press",
  "/news/cdc-news-how-to-get-traditional-egyptian-cuisine-without-leaving-your-office/": "/our-story/#press",
  "/news/eden-lanz-masrawy-kitchen/": "/our-story/#press",
  "/news/five-reasons-you-need-to-try-this-amazing-egyptian-restaurant/": "/our-story/#press",
  "/news/highly-anticipated-egyptian-restaurant-officially-open-in-mississauga/": "/our-story/#press",
  "/news/masrawy-brings-true-egyptian-cuisine-hospitality-to-mississauga/": "/our-story/#press",
  "/review/masrawy-kitchen-our-egyptian-experience/": "/our-story/#press",
  "/review/masrawy-kitchen-preview/": "/our-story/#press",
  "/MEK-Menu-v4F.pdf": "/menu/",
  "/MEK-Menu-Breakfast.pdf": "/brunch/",
  "/MEK-Catering-Corporate.pdf": "/catering/#corporate",
};
const redirects = Object.fromEntries(Object.entries(OLD).map(([from, to]) => [from, b + to]));

export default defineConfig({
  base,
  trailingSlash: "always",
  build: { format: "directory" },
  compressHTML: true,
  server: { port: 8014 },
  redirects,
});
