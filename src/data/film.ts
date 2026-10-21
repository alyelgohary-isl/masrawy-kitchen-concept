/* "A Taste of Egypt." The home film (v3: beats caption the dish on screen; ~7 units of scroll), passed to <ScrollFilm> in src/pages/index.astro.
   Six Kling 3.0 clips, 61 frames each (366). Wide clips cover the viewport; the three close-ups are squares that float on the cream ground (bleed layout).
   Every clip starts (or ends) on one of the client's own photographs, so the motion is added to their real food and room, never invented.
   Between clips a `cut` segment drops the film to the ground and draws a gold rule with the next chapter's label, so the change of image reads as a page turn, not a jump.
   Provenance and prompts: work/beats.md and work/gen/kie.log. */

export const sources = {
  screen:  { dir: "frames/screen",  prefix: "sc_", count: 31 },  // only the first 2.5 s of the glide are used (and downloaded)   // C1 16:9: slow glide into the semi-private room toward the arabesque wall (from their photo H-21)
  coffee:  { dir: "frames/coffee",  prefix: "cf_", count: 61 },   // C2 1:1: coffee pours from the kanaka, steam (from V-26); floats on the ground
  koshary: { dir: "frames/koshary", prefix: "ko_", count: 61 },   // C3 1:1: empty bowl fills layer by layer, ends on their koshary photo (V-09)
  tahina:  { dir: "frames/tahina",  prefix: "ta_", count: 61 },   // C4 1:1: tahina pours over kofta (from V-47)
  hands:   { dir: "frames/hands",   prefix: "ha_", count: 61 },   // C5: hands reach into the shared spread (from 343A9195)
  night:   { dir: "frames/night",   prefix: "ni_", count: 61 },   // C6: the room from lunch to lantern hour (H-19 → generated night edit)
};

type Ref = [keyof typeof sources, number];
type Segment = { id: string; units: number } & ({ from: Ref; to: Ref } | { hold: Ref } | { cut: true; label: string; ar?: string });

export const timeline: Segment[] = [
  { id: "hero",    units: 0.5,  hold: ["screen", 0] },                      // "A Taste of Egypt" over the lit room
  { id: "screen",  units: 0.5,  from: ["screen", 0],  to: ["screen", 30] }, // a short glide toward the pattern
  { id: "h1",      units: 0.15, hold: ["screen", 30] },
  { id: "c1",      units: 0.2,  cut: true, label: "Welcome", ar: "أهلاً" },
  { id: "coffee",  units: 0.7,  from: ["coffee", 0],  to: ["coffee", 60] }, // coffee from the kanaka
  { id: "h2",      units: 0.2,  hold: ["coffee", 60] },
  { id: "c2",      units: 0.2,  cut: true, label: "Koshary", ar: "كشري" },
  { id: "koshary", units: 0.8,  from: ["koshary", 0], to: ["koshary", 60] },// the bowl builds
  { id: "h3",      units: 0.25, hold: ["koshary", 60] },
  { id: "c3",      units: 0.2,  cut: true, label: "The grill", ar: "مشويات" },
  { id: "tahina",  units: 0.65, from: ["tahina", 0],  to: ["tahina", 48] }, // tahina over kofta (frames 49–60 morph the jug; unused)
  { id: "h4",      units: 0.2,  hold: ["tahina", 48] },
  { id: "c4",      units: 0.2,  cut: true, label: "The table", ar: "سفرة" },
  { id: "hands",   units: 0.7,  from: ["hands", 0],   to: ["hands", 60] },  // hands reach into the spread
  { id: "h5",      units: 0.2,  hold: ["hands", 60] },
  { id: "c5",      units: 0.2,  cut: true, label: "The room", ar: "الصالة" },
  { id: "night",   units: 0.8,  from: ["night", 0],   to: ["night", 60] },  // lunch to lantern hour
  { id: "end",     units: 0.45, hold: ["night", 60] },
];

/* Frames loaded before the loader lifts; the rest stream in scroll order */
export const preload: Ref = ["screen", 24];

/* No scrim: wide-frame beats put their copy on a solid cream panel (.on-photo) so the photograph stays crisp */
export const scrim = undefined;

/* Full-bleed layout: the film fills the viewport; the page ground is the site's cream */
export const layout = "bleed" as const;
export const ground = "#f1ebe1";
