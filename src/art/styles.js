// Style variants for the style bible (D-003). Each variant is a set of
// numbers and colours; the drawing code in draw.js is shared, so the
// chosen variant can go straight into the game.

// Uppsala's typical facades: ochre and yellow plaster, red brick, white
// plaster, and copper-green and red-tiled roofs.
const UPPSALA = {
  facades: [0xe3b25a, 0xefd28a, 0xc96b4e, 0xece6da, 0xa8503a, 0xb9c7a1],
  roofs: [0xb85a43, 0x6fa58f, 0x5d6168, 0x8c4a3a],
};

export const STYLES = [
  {
    id: 'pastell',
    name: 'Variant 1 – Sommarkväll',
    summary: 'Ljusa pastellfärger, tunn mörk kontur och mjuka skuggor snett nedåt höger, som en sen eftermiddag i maj.',
    outline: { width: 1.3, color: 0x3b3430, alpha: 0.7 },
    shadow: { dx: 0.55, dy: 0.8, color: 0x2a2440, alpha: 0.2, layers: 1 },
    light: 0.12, // how much lighter/darker lit and shaded sides are
    saturation: 0.85,
    ground: {
      asphalt: 0x6b6d72,
      asphaltDark: 0x5c5e63,
      lane: 0xf4f1e6,
      sidewalk: 0xd8d2c6,
      tileLine: 0xc6bfb2,
      curb: 0xb3ab9d,
      grass: 0x9fbf84,
      bikeLane: 0xb98476,
      crack: 0x4e5054,
    },
    facades: UPPSALA.facades,
    roofs: UPPSALA.roofs,
    window: 0x55657a,
    windowLit: 0x8fa3b8,
    frame: 0xf6f2ea,
    metal: 0x3f4247,
    tree: [0x7aa06a, 0x93b97f],
  },
  {
    id: 'serie',
    name: 'Variant 2 – Serietidning',
    summary: 'Kraftiga svarta konturer, mättade platta färger och hårda skuggor, som en tecknad serie. Tydligast på liten skärm.',
    outline: { width: 2.6, color: 0x1c1b20, alpha: 1 },
    shadow: { dx: 0.7, dy: 0.95, color: 0x1c1b20, alpha: 0.32, layers: 1 },
    light: 0.18,
    saturation: 1.15,
    ground: {
      asphalt: 0x5a5c63,
      asphaltDark: 0x4b4d54,
      lane: 0xffffff,
      sidewalk: 0xcfc7b8,
      tileLine: 0xb2a998,
      curb: 0x9b9282,
      grass: 0x7fbf5a,
      bikeLane: 0xc4614e,
      crack: 0x2d2e33,
    },
    facades: UPPSALA.facades,
    roofs: UPPSALA.roofs,
    window: 0x2f4a6b,
    windowLit: 0x7fb2e6,
    frame: 0xffffff,
    metal: 0x26272b,
    tree: [0x4f9a45, 0x75c25f],
  },
  {
    id: 'nordisk',
    name: 'Variant 3 – Nordiskt mjuk',
    summary: 'Inga konturer, dova nordiska färger och mjuka, breda skuggor. Lugnare och mer verklighetsnära.',
    outline: { width: 0, color: 0x000000, alpha: 0 },
    shadow: { dx: 0.6, dy: 0.85, color: 0x24262e, alpha: 0.07, layers: 4 },
    light: 0.1,
    saturation: 0.7,
    ground: {
      asphalt: 0x707377,
      asphaltDark: 0x65686c,
      lane: 0xe6e4dc,
      sidewalk: 0xc9c5bc,
      tileLine: 0xbdb8ae,
      curb: 0xaaa59b,
      grass: 0x93a883,
      bikeLane: 0xa48478,
      crack: 0x55585c,
    },
    facades: UPPSALA.facades,
    roofs: UPPSALA.roofs,
    window: 0x5f6b78,
    windowLit: 0x9aa8b6,
    frame: 0xe8e4dc,
    metal: 0x4a4d52,
    tree: [0x7d9470, 0x91a684],
  },
];
