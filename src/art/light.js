// Evening light (D-038): the scene is darkened, then light sources are
// added on top with additive blending, so they brighten what is under them.

import { Container, Graphics, Sprite, Texture } from '../../vendor/pixi/pixi.min.mjs';
import { U } from './draw.js';

let glowTex = null;
let coneTex = null;

// A soft round gradient, white in the middle and transparent at the edge.
function glowTexture() {
  if (glowTex) return glowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const gr = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  gr.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, 256, 256);
  glowTex = Texture.from(c);
  return glowTex;
}

// A headlight beam: a wedge that fades with distance. Points along +x.
function coneTexture() {
  if (coneTex) return coneTex;
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 128;
  const ctx = c.getContext('2d');
  const gr = ctx.createRadialGradient(0, 64, 0, 0, 64, 256);
  gr.addColorStop(0, 'rgba(255,255,255,0.9)');
  gr.addColorStop(0.5, 'rgba(255,255,255,0.35)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gr;
  ctx.beginPath();
  ctx.moveTo(0, 56);
  ctx.lineTo(256, 0);
  ctx.lineTo(256, 128);
  ctx.lineTo(0, 72);
  ctx.closePath();
  ctx.fill();
  coneTex = Texture.from(c);
  return coneTex;
}

export function createLightLayer(w, h, darkness = 0.55, tint = 0x1b2442) {
  const root = new Container();
  const dark = new Graphics().rect(0, 0, w * U, h * U).fill({ color: tint, alpha: darkness });
  const lights = new Container();
  root.addChild(dark, lights);
  return {
    root,
    glow(x, y, radius, color = 0xffd9a0, alpha = 0.85) {
      const s = new Sprite(glowTexture());
      s.anchor.set(0.5);
      s.position.set(x * U, y * U);
      s.width = s.height = radius * 2 * U;
      s.tint = color;
      s.alpha = alpha;
      s.blendMode = 'add';
      lights.addChild(s);
      return s;
    },
    cone(x, y, angle, length, color = 0xfff1c8, alpha = 0.6) {
      const s = new Sprite(coneTexture());
      s.anchor.set(0, 0.5);
      s.position.set(x * U, y * U);
      s.width = length * U;
      s.height = length * 0.5 * U;
      s.rotation = angle;
      s.tint = color;
      s.alpha = alpha;
      s.blendMode = 'add';
      lights.addChild(s);
      return s;
    },
  };
}
