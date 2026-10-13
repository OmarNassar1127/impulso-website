# Brief: one 3D scene for the Impulsoco "Van idee tot lancering" section

Repo: `~/projects/impulso-website` (Next.js 14, React 18, Tailwind 3). Site impulsoco.nl, light theme (white page), primary colour terracotta `#b54a2b`.
The section `src/components/sections/case-studies.tsx` shows two cases. Each case has text on one side and a visual on the other. You build the visual for ONE case as an animated isometric CSS-3D scene.

## Quality bar

This kit and approach produced the case-study scenes on omardev.xyz. Read these reference scenes in full first; they are the bar to match or beat:
- `~/projects/new-portfolio-next/components/scenes/invoice-fraud-prevention-platform.tsx`
- `~/projects/new-portfolio-next/components/scenes/license-plate-detection-system.tsx`
- `~/projects/new-portfolio-next/components/scenes/ai-meeting-assistant-voice-automation.tsx`

The object is the explanation: show the case as a real, recognisable physical place or machine with 50 to 100 small precise parts (bases, posts, screens, cables, small detail). Do NOT make a conveyor belt with a gate; those are overused. Find the object that belongs to THIS case.

## Hard rules

- Only edit your own file (named below). Do not touch `kit.tsx`, the section file, the other scene or anything else. No git commands. Do not start or stop the dev server.
- Default export: `export default function Scene({ language, className }: { language: string; className?: string })` returning a `<Stage w d tone="paper" label={...} className={className} ...>` from `./kit`. Do not pass `subject` or `flow` (the card already has the text).
- `language` is `"nl"` or `"en"`. Every label must be in both languages (Dutch first, it is a Dutch site). Use natural Dutch.
- All animation must run in a CHILD component rendered inside `<Stage>` (`useFrame` only works below Stage). Mutate refs in `useFrame`; never setState per frame.
- Numbers shown must come from the case data in `case-studies.tsx` (results). Never invent figures, names or clients. At most 4 `Chip` labels.
- Labels: wrap in `Bill` + `Chip`; the kit draws them in front of everything automatically. Keep labels apart from each other and from the frame edges.
- Palette: use `P` and `shade()` from the kit. Light scene: base plate in paper/steel tones (`P.paper2`, `#d9d9d3`), dark parts in `P.ink`/`P.ink3`, terracotta `P.signal` as the one accent. Assist may use `P.green` (WhatsApp green) for message bubbles only.
- No WebGL, no images, no new packages. Inline SVG inside a `Bill` needs explicit width/height and `style={{maxWidth:'none'}}`.
- Floor around 600x400 world px; start with `zoom={0.95}`. Must read at 390 px (phone) and 1440 px.

## Kit (`src/components/scenes/kit.tsx`), read it first

`Stage`, `Box` (`front` paints the face toward the viewer, `top` paints the top), `Slab`, `Group` (move via `ref.current.style.transform = translate3d(...)`), `Bill` (billboard facing the viewer), `Chip`, `useFrame`, `OnFrame`, `ease`, `lerp`, `span`, `clamp01`. Coordinates: x right, y toward the viewer, z up. A part lying ON a box of height h at base z needs z = base + h + 0.5. Visible faces: top, south (y+d), west (x=0).

## Verify (required)

1. `cd ~/projects/impulso-website && NODE_ENV=development npx tsc --noEmit -p . 2>&1 | grep scenes/` prints nothing.
2. `cd ~/projects/motion-lab-test && node imp-scene.mjs <INDEX> /tmp/imp-<NAME>` then READ `/tmp/imp-<NAME>-desk.png`, `-desk-b.png` and `-phone.png`. Fix anything hidden, clipped, overlapping or empty. Up to 5 iterations. The dev server can be slow on first compile; rerun if it says not found.
3. Final answer, short: the one-sentence concept, the file path, the three screenshot paths, and anything that still looks off.
