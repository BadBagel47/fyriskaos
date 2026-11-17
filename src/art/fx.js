// Explosion in three stages (D-038): flash, fireball, smoke.

import { U, rng } from './draw.js';

export function scorch(g, x, y, radius, seed) {
  const r = rng(seed);
  for (let i = 0; i < 18; i++) {
    const a = r() * Math.PI * 2;
    const d = r() * radius * 0.65;
    g.circle((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, radius * (0.25 + r() * 0.3) * U).fill({ color: 0x0f0e0c, alpha: 0.3 });
  }
  // Soot streaks thrown outwards.
  for (let i = 0; i < 10; i++) {
    const a = r() * Math.PI * 2;
    g.moveTo((x + Math.cos(a) * radius * 0.6) * U, (y + Math.sin(a) * radius * 0.6) * U)
      .lineTo((x + Math.cos(a) * radius * (1.1 + r() * 0.4)) * U, (y + Math.sin(a) * radius * (1.1 + r() * 0.4)) * U)
      .stroke({ width: 0.16 * U, color: 0x0f0e0c, alpha: 0.16, cap: 'round' });
  }
}

// A flame tongue pointing in the wind direction (south-east), as a teardrop.
function flame(g, x, y, size, r) {
  const a = Math.PI / 4 + (r() - 0.5) * 1.4;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const tip = [x + ca * size * 1.6, y + sa * size * 1.6];
  const left = [x - sa * size * 0.55, y + ca * size * 0.55];
  const right = [x + sa * size * 0.55, y - ca * size * 0.55];
  const back = [x - ca * size * 0.5, y - sa * size * 0.5];
  const pts = (k) => [back[0], back[1], left[0] * k + x * (1 - k), left[1] * k + y * (1 - k), tip[0] * k + x * (1 - k), tip[1] * k + y * (1 - k), right[0] * k + x * (1 - k), right[1] * k + y * (1 - k)].map((v) => v * U);
  g.poly(pts(1)).fill({ color: 0xd8451e, alpha: 0.95 });
  g.poly(pts(0.7)).fill({ color: 0xf59a2c, alpha: 0.95 });
  g.poly(pts(0.38)).fill({ color: 0xffe08a, alpha: 0.95 });
}

// Muzzle flash in front of a gun barrel pointing along +x from (x, y).
export function muzzleFlash(g, x, y, angle, seed, light = null) {
  const r = rng(seed);
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const P = (fx, fy) => [(x + c * fx - s * fy) * U, (y + s * fx + c * fy) * U];
  g.poly([...P(0, -0.12), ...P(0.9, -0.05), ...P(1.1, 0), ...P(0.9, 0.05), ...P(0, 0.12)]).fill({ color: 0xffb347, alpha: 0.95 });
  g.poly([...P(0.1, -0.3), ...P(0.45, 0), ...P(0.1, 0.3), ...P(0.25, 0)]).fill({ color: 0xffd36b, alpha: 0.9 });
  g.circle(...P(0.15, 0), 0.16 * U).fill(0xffffff);
  // Tracer line towards the target.
  g.moveTo(...P(1.2, 0)).lineTo(...P(7 + r(), 0)).stroke({ width: 0.06 * U, color: 0xfff0b0, alpha: 0.75, cap: 'round' });
  if (light) light.glow(x + c * 0.3, y + s * 0.3, 3, 0xffc060, 0.6);
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
    // A faint dust ring kicked up by the blast.
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + r() * 0.2;
      const d = 2.8 + r() * 0.9;
      g.circle((x + Math.cos(a) * d) * U, (y + Math.sin(a) * d) * U, (0.25 + r() * 0.35) * U).fill({ color: 0xcfc4b0, alpha: 0.16 });
    }
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
    // The wreck burns; soft smoke drifts away towards the south-east.
    for (let i = 0; i < 26; i++) {
      const t = i / 26;
      const cx = x + 1.0 + t * 5 + (r() - 0.5) * (0.8 + t * 1.5);
      const cy = y + 0.7 + t * 3.6 + (r() - 0.5) * (0.8 + t * 1.5);
      const rad = 0.6 + t * 1.6 + r() * 0.4;
      g.circle(cx * U, cy * U, rad * U).fill({ color: 0x4a484d, alpha: 0.16 * (1 - t * 0.6) });
      g.circle((cx - rad * 0.2) * U, (cy - rad * 0.2) * U, rad * 0.6 * U).fill({ color: 0x7a787d, alpha: 0.1 * (1 - t * 0.6) });
    }
    for (let i = 0; i < 7; i++) {
      const fx0 = x - 1.4 + r() * 2.6;
      const fy0 = y - 0.7 + r() * 1.4;
      g.circle(fx0 * U, fy0 * U, 0.45 * U).fill({ color: 0xff7a20, alpha: 0.25 });
      flame(g, fx0, fy0, 0.22 + r() * 0.3, r);
    }
    if (light) light.glow(x, y, 4.5, 0xff8a30, 0.5);
  }
}
