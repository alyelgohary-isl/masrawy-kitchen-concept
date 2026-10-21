/* "Lantern hour." The home film, passed to <ScrollFilm> in src/pages/index.astro.
   Six Kling 3.0 clips, 61 frames each (366). Wide clips are 1920x1080 and cover the viewport; the three close-ups are 1080 squares that float on the night ground (bleed layout).
   Every clip starts (or ends) on one of the client's own photographs, so the motion is added to their real food and room, never invented.
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
type Segment = { id: string; units: number } & ({ from: Ref; to: Ref } | { hold: Ref });

export const timeline: Segment[] = [
  { id: "hero",    units: 0.6, hold: ["screen", 0] },                     // the H1 over the lit screen
  { id: "screen",  units: 0.9, from: ["screen", 0],  to: ["screen", 60] }, // glide toward the pattern
  { id: "h1",      units: 0.25, hold: ["screen", 60] },
  { id: "coffee",  units: 0.9, from: ["coffee", 0],  to: ["coffee", 60] }, // 1 · hospitality
  { id: "h2",      units: 0.3, hold: ["coffee", 60] },
  { id: "koshary", units: 1.0, from: ["koshary", 0], to: ["koshary", 60] },// 2 · the bowl builds
  { id: "h3",      units: 0.4, hold: ["koshary", 60] },
  { id: "tahina",  units: 0.8, from: ["tahina", 0],  to: ["tahina", 48] }, // 3 · the grill (frames 49–60 morph the jug; unused)
  { id: "h4",      units: 0.3, hold: ["tahina", 48] },
  { id: "hands",   units: 0.9, from: ["hands", 0],   to: ["hands", 60] },  // 4 · shared
  { id: "h5",      units: 0.3, hold: ["hands", 60] },
  { id: "night",   units: 1.0, from: ["night", 0],   to: ["night", 60] },  // 5 · the room, lunch to lantern hour
  { id: "end",     units: 0.6, hold: ["night", 60] },                      //     stats and CTA over the lit room
];

/* Frames loaded before the loader lifts; the rest stream in scroll order */
export const preload: Ref = ["screen", 24];  // the first two seconds of the glide; the rest streams in scroll order

/* Dark wash under the closing stats so the copy reads over the lit room */
export const overlay = { enter: "night:0.75", leave: "end:0.98", max: 0.55, color: "#120b09" };
export const marquee: { text: string; enter: string; leave: string } | undefined = undefined;

/* Full-bleed layout: the film fills the viewport; the page ground matches the shadows of the stills */
export const layout = "bleed" as const;
export const ground = "#120b09";
