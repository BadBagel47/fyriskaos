// Small colour helpers.

export function mix(a, b, t) {
  const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
  const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return (r << 16) | (g << 8) | bl;
}

// t > 0 lightens, t < 0 darkens.
export function shade(c, t) {
  return t < 0 ? mix(c, 0x000000, -t) : mix(c, 0xffffff, t);
}

// Scale saturation around the colour's own grey.
export function saturate(c, s) {
  const r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255;
  const grey = 0.3 * r + 0.59 * g + 0.11 * b;
  const f = (v) => Math.max(0, Math.min(255, Math.round(grey + (v - grey) * s)));
  return (f(r) << 16) | (f(g) << 8) | f(b);
}
