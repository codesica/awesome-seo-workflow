# Roadmap asset verification

- Created four original, static SVG illustrations and four matching PNG renders.
- Desktop canvases: 1100 × 500. Mobile canvases: 375 × 850.
- Rendered all SVGs with Inkscape and visually inspected every PNG at its native dimensions. All labels are visible, with no overlapping or clipped text.
- XML validation passed. Each SVG has exactly six stable stage groups with both id and data-node-id. No scripts or external image/font dependencies. Every text element is at least 15 px.
- Root SVG title/desc and per-stage titles are included. Assets have no implemented click, expansion, keyboard, or motion behavior; manifest.json documents frontend responsibilities.
- Mobile routes run vertically. Desktop routes form a continuous horizontal path. Six distinct output icons and numbered circular stations replace rectangular card layouts.
- Each version explicitly states that following the process does not guarantee traffic.
- Fonts use a local Arial / Noto Sans CJK SC / sans-serif fallback stack. Tested rendering used installed CJK fonts; no remote font fetches.
