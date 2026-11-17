// Explosion in three stages (D-038): flash, fireball, smoke.

import { U, rng } from './draw.js';

export function scorch(g, x, y, radius, seed) {
  const r = rng(seed);
  for (let i = 0; i < 14; i++) {
    const a = r() * Math.PI * 2;
    const d = r() * radius * 0.6;
    g.circle((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, radius * (0.3 + r() * 0.3) * U).fill({ color: 0x15130f, alpha: 0.18 });
  }
}

function spikes(g, x, y, n, r0, r1, color, width, r) {
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.3;
    const len = r1 * (0.6 + r() * 0.5);
    g.moveTo((x + Math.cos(a) * r0) * U, (y + Math.sin(a) * r0) * U).lineTo((x + Math.cos(a) * len) * U, (y + Math.sin(a) * len) * U);
    g.stroke({ width: width * U, color, alpha: 0.9, cap: 'round' });
  }
}

// stage: 0 flash, 1 fireball, 2 smoke. light: optional light layer for the glow.
export function explosion(g, x, y, stage, seed, light = null) {
  const r = rng(seed);
  if (stage === 0) {
    // Shock ring, short uneven rays, a hot core.
    g.circle(x * U, y * U, 3.4 * U).stroke({ width: 0.12 * U, color: 0xfff3d0, alpha: 0.55 });
    spikes(g, x, y, 11, 0.8, 3.0, 0xfff0b0, 0.12, r);
    g.circle(x * U, y * U, 1.7 * U).fill({ color: 0xff9d3a, alpha: 0.85 });
    g.circle((x - 0.15) * U, (y - 0.1) * U, 1.15 * U).fill({ color: 0xffd86a, alpha: 0.95 });
    g.circle((x - 0.2) * U, (y - 0.15) * U, 0.6 * U).fill(0xfffbe8);
    if (light) light.glow(x, y, 8, 0xffc870, 0.6);
  } else if (stage === 1) {
    // Dark smoke edge, then red, orange and a yellow heart: the fireball has volume.
    for (let i = 0; i < 12; i++) {
      const a = r() * Math.PI * 2;
      const d = 1.5 + r() * 0.8;
      g.circle((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, (0.7 + r() * 0.5) * U).fill({ color: 0x3a3236, alpha: 0.75 });
    }
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2;
      const d = r() * 1.5;
      g.circle((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, (0.7 + r() * 0.6) * U).fill({ color: 0xb8361c, alpha: 0.95 });
    }
    for (let i = 0; i < 12; i++) {
      const a = r() * Math.PI * 2;
      const d = r() * 1.1;
      g.circle((x - 0.2 + Math.cos(a) * d) * U, (y - 0.2 + Math.sin(a) * d) * U, (0.45 + r() * 0.5) * U).fill({ color: 0xf07a26, alpha: 0.95 });
    }
    for (let i = 0; i < 6; i++) {
      const a = r() * Math.PI * 2;
      const d = r() * 0.6;
      g.circle((x - 0.35 + Math.cos(a) * d) * U, (y - 0.35 + Math.sin(a) * d) * U, (0.25 + r() * 0.3) * U).fill({ color: 0xffd36b, alpha: 0.95 });
    }
    for (let i = 0; i < 16; i++) {
      const a = r() * Math.PI * 2;
      const d = 2.6 + r() * 2.6;
      const px = x + Math.cos(a) * d;
      const py = y + Math.sin(a) * d;
      g.moveTo(px * U, py * U).lineTo((px - Math.cos(a) * 0.5) * U, (py - Math.sin(a) * 0.5) * U).stroke({ width: 0.07 * U, color: 0xffc85a, alpha: 0.9, cap: 'round' });
    }
    for (let i = 0; i < 7; i++) {
      const a = r() * Math.PI * 2;
      const d = 2.4 + r() * 2.4;
      g.rect((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, (0.2 + r() * 0.25) * U, (0.12 + r() * 0.15) * U).fill(0x2a2a2e);
    }
    if (light) light.glow(x, y, 7, 0xff8c3a, 0.55);
  } else {
    // The wreck burns; the smoke drifts away towards the south-east.
    for (let i = 0; i < 16; i++) {
      const t = i / 16;
      const cx = x + 1.2 + t * 4.5 + (r() - 0.5) * 1.2;
      const cy = y + 0.8 + t * 3.2 + (r() - 0.5) * 1.2;
      g.circle(cx * U, cy * U, (0.7 + t * 1.3 + r() * 0.4) * U).fill({ color: r() < 0.5 ? 0x3d3c40 : 0x56545a, alpha: 0.55 - t * 0.25 });
    }
    for (let i = 0; i < 5; i++) {
      const px = x - 1 + r() * 2;
      const py = y - 0.5 + r() * 1;
      g.ellipse(px * U, py * U, 0.3 * U, 0.22 * U).fill({ color: 0xf07a26, alpha: 0.95 });
      g.ellipse((px - 0.05) * U, (py - 0.05) * U, 0.15 * U, 0.1 * U).fill({ color: 0xffe08a, alpha: 0.95 });
    }
    if (light) light.glow(x, y, 4, 0xff8a30, 0.45);
  }
}
