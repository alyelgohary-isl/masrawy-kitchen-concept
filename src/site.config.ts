/* Everything that changes per client, in one place. The layout, header,
   footer and head tags read from here; pages only carry their own copy.
   Paths are site-relative ("contact/", "assets/img/x.webp"); the base path
   is added at build time; mailto:/https:/tel: links are left alone. */

const email = "info@masrawykitchen.com";      // CONFIRM: no email is published on the current site
export const phone = "+1 (647) 654-4444";
export const phoneHref = "tel:+16476544444";
export const address = {
  street: "2275 Britannia Rd W, Units 1 & 2",
  city: "Mississauga",
  region: "ON",
  postal: "L5M 2G6",                           // CONFIRM: postal code (from a public listing, not the client's site)
  country: "CA",
};
export const orderUrl = "https://www.clover.com/online-ordering/masrawy-egyptian-kitchen-mississauga";
export const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Masrawy+Egyptian+Kitchen+2275+Britannia+Rd+W+Mississauga";
export const mapsEmbed = "https://www.google.com/maps?q=Masrawy+Egyptian+Kitchen,+2275+Britannia+Rd+W,+Mississauga,+ON&output=embed";
export const social = {
  instagram: "https://www.instagram.com/masrawy_kitchen/",
  facebook: "https://www.facebook.com/masrawyegyptiankitchen/",
  tiktok: "https://www.tiktok.com/@masrawy_kitchen",   // CONFIRM: TikTok handle
};
export const hours = [
  { days: "Sunday to Thursday", open: "10:00", close: "22:00", short: "Sun–Thu", dayCodes: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"] },
  { days: "Friday and Saturday", open: "10:00", close: "23:00", short: "Fri–Sat", dayCodes: ["Friday", "Saturday"] },
];
export const brunchHours = "10:00 – 14:00, every day";

export const site = {
  /** Legal/brand name: page titles, Restaurant schema, footer copyright */
  name: "Masrawy Egyptian Kitchen",
  /** Header and footer lockup: Arabic mark, then the latin name */
  brand: ["مصراوي", "Masrawy"],
  /** Production domain, used for canonical and OG URLs (not where the preview is hosted) */
  url: "https://masrawykitchen.com",
  email,
  tagline: "A Taste of Egypt",
  /** Footer blurb and schema description */
  description: "Egyptian soul food in Mississauga: dine-in, take-out, brunch every day, and catering across the GTA since 2014. 100% halal.",

  /** Concept build: keep search engines off until this replaces the live site */
  noindex: true,

  /** Google Fonts stylesheet; change together with --font-* in src/styles/style.css */
  fonts: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&family=Albert+Sans:wght@300;400;500;600&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap",
  /** Letter favicon drawn as an inline SVG */
  favicon: { letter: "م", background: "#23282f", color: "#ab965d" },
  /** Default OG image in public/ */
  ogImage: "assets/img/og.webp",

  nav: [
    { key: "menu", href: "menu/", label: "Menu" },
    { key: "brunch", href: "brunch/", label: "Brunch" },
    { key: "room", href: "the-room/", label: "The Room" },
    { key: "catering", href: "catering/", label: "Catering" },
    { key: "story", href: "our-story/", label: "Our Story" },
  ],
  cta: { label: "Order online", href: orderUrl },
  secondaryCta: { label: "Reserve", href: "reserve/" },

  /** Footer copy, as on the current site */
  footer: {
    about: "Authentic Egyptian food made from original recipes and prepared with fresh 100% Halal ingredients. All our beautiful photos were taken by DK Photography.",
    newsletterNote: "* We never send you spam!",
    legalName: "Masrawy Fine Egyptian Catering",
    links: [
      { label: "Menu", href: "menu/" }, { label: "Breakfast", href: "brunch/" }, { label: "The Room", href: "the-room/" },
      { label: "Catering", href: "catering/" }, { label: "Our Story", href: "our-story/" }, { label: "Gallery", href: "gallery/" },
      { label: "Reserve", href: "reserve/" }, { label: "Contact", href: "contact/" }, { label: "Legal", href: "legal/" },
    ],
  },

  /** Restaurant JSON-LD merged over the Organization defaults in Layout.astro */
  schema: {
    "@type": "Restaurant",
    servesCuisine: ["Egyptian", "Middle Eastern", "Halal"],
    priceRange: "$$",
    telephone: "+1-647-654-4444",
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postal,
      addressCountry: address.country,
    },
    openingHoursSpecification: hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayCodes,
      opens: h.open,
      closes: h.close,
    })),
    hasMenu: "https://masrawykitchen.com/menu/",
    sameAs: [social.instagram, social.facebook],
    foundingDate: "2014",
    founder: { "@type": "Person", name: "Mohamed Salah Saleh" },
  } as Record<string, unknown>,

  /** Tracking IDs come from the environment, never this file: .env locally, repo variables
      in CI (tools/deploy.sh copies them over). Empty = that snippet is left out. */
  tracking: {
    gtm: env("PUBLIC_GTM_ID"),
    ga4: env("PUBLIC_GA4_ID"),
    gscVerification: env("PUBLIC_GSC_VERIFICATION"),
  },
};

function env(name: string): string {
  return import.meta.env.PROD ? String(import.meta.env[name] ?? "").trim() : "";
}

export type NavKey = (typeof site.nav)[number]["key"];
