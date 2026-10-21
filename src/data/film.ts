/* "A Taste of Egypt." The home film, passed to <ScrollFilm> in src/pages/index.astro.
   Six Kling 3.0 clips, 61 frames each (366). Wide clips cover the viewport; the three close-ups are squares that float on the cream ground (bleed layout).
   Every clip starts (or ends) on one of the client's own photographs, so the motion is added to their real food and room, never invented.
   Between clips a `cut` segment drops the film to the ground and draws a gold rule with the next chapter's label, so the change of image reads as a page turn, not a jump.
   Provenance and prompts: work/beats.md and work/gen/kie.log. */

export const sources = {
  screen:  { dir: "frames/screen",  prefix: "sc_", count: 61 },   // C1 16:9: slow glide into the semi-private room toward the arabesque wall (from their photo H-21)
  coffee:  { dir: "frames/coffee",  prefix: "cf_", count: 61 },   // C2 1:1: coffee pours from the kanaka, steam (from V-26); floats on the ground
  koshary: { dir: "frames/koshary", prefix: "ko_", count: 61 },   // C3 1:1: empty bowl fills layer by layer, ends on their koshary photo (V-09)
  tahina:  { dir: "frames/tahina",  prefix: "ta_", count: 61 },   // C4 1:1: tahina pours over kofta (from V-47)
  hands:   { dir: "frames/hands",   prefix: "ha_", count: 61 },   // C5: hands reach into the shared spread (from 343A9195)
  night:   { dir: "frames/night",   prefix: "ni_", count: 61 },   // C6: the room from lunch to lantern hour (H-19 → generated night edit)
};

type Ref = [keyof typeof sources, number];
type Segment = { id: string; units: number } & ({ from: Ref; to: Ref } | { hold: Ref } | { cut: true; label: string; ar?: string });

export const timeline: Segment[] = [
  { id: "hero",    units: 0.6,  hold: ["screen", 0] },                      // "A Taste of Egypt" over the lit room
  { id: "screen",  units: 0.9,  from: ["screen", 0],  to: ["screen", 60] }, // glide toward the pattern
  { id: "h1",      units: 0.2,  hold: ["screen", 60] },
  { id: "c1",      units: 0.28, cut: true, label: "Welcome", ar: "أهلاً" },
  { id: "coffee",  units: 0.9,  from: ["coffee", 0],  to: ["coffee", 60] }, // Welcome: the menus
  { id: "h2",      units: 0.3,  hold: ["coffee", 60] },
  { id: "c2",      units: 0.28, cut: true, label: "2014" },
  { id: "koshary", units: 1.0,  from: ["koshary", 0], to: ["koshary", 60] },// 2014: the catering start
  { id: "h3",      units: 0.35, hold: ["koshary", 60] },
  { id: "c3",      units: 0.28, cut: true, label: "2016" },
  { id: "tahina",  units: 0.8,  from: ["tahina", 0],  to: ["tahina", 48] }, // 2016: a bigger vision (frames 49–60 morph the jug; unused)
  { id: "h4",      units: 0.3,  hold: ["tahina", 48] },
  { id: "c4",      units: 0.28, cut: true, label: "2018" },
  { id: "hands",   units: 0.9,  from: ["hands", 0],   to: ["hands", 60] },  // 2018: the restaurant
  { id: "h5",      units: 0.3,  hold: ["hands", 60] },
  { id: "c5",      units: 0.28, cut: true, label: "Mohamed Saleh" },
  { id: "night",   units: 1.0,  from: ["night", 0],   to: ["night", 60] },  // the founder's words over the room, lunch to lantern hour
  { id: "end",     units: 0.6,  hold: ["night", 60] },
];

/* Frames loaded before the loader lifts; the rest stream in scroll order */
export const preload: Ref = ["screen", 24];

/* Cream scrim the canvas paints under the copy column on wide frames (landscape only), so the copy stays ink on paper */
export const scrim = { color: "#f5f3f0" };

/* Full-bleed layout: the film fills the viewport; the page ground is the site's cream */
export const layout = "bleed" as const;
export const ground = "#f5f3f0";
