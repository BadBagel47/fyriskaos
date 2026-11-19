// Build the playable map of central Uppsala from OpenStreetMap (F-005).
// Usage: node tools/build_map.mjs   -> data/map/centrum.json
//
// Simplified and playable: the street grid is turned so the streets run
// along the screen axes, everything is laid on a 1 m grid of ground types,
// buildings become rectangles (for collisions) grouped per OSM building,
// roads keep their centre lines (paint, parked cars, lamps). Map data
// © OpenStreetMap contributors, ODbL (see data/osm/LICENSE.md).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const osm = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/osm/uppsala-centrum.json'), 'utf8'));

// ---------- projection: metres around the centre, turned along the street grid ----------
const LAT0 = 59.8588;
const LON0 = 17.6375;
const KX = 111320 * Math.cos((LAT0 * Math.PI) / 180);
const KY = 110574;
const ANGLE = (43 * Math.PI) / 180; // the main street direction (from east)
const ca = Math.cos(ANGLE);
const sa = Math.sin(ANGLE);
// Turned frame: u along the streets, w across; the map's x = u, y = -w (y down).
const U0 = -560;
const U1 = 640;
const W0 = -700;
const W1 = 780;
const WIDTH = U1 - U0;
const HEIGHT = W1 - W0;
function project(lat, lon) {
  const e = (lon - LON0) * KX;
  const n = (lat - LAT0) * KY;
  const u = e * ca + n * sa;
  const w = -e * sa + n * ca;
  return [u - U0, W1 - w];
}
// The real north on the map (for the record and a compass later).
const NORTH = Math.atan2(-ca, sa);

// ---------- ground types on a 1 m grid ----------
export const G = { slab: 1, grass: 2, path: 3, road: 4, water: 5, bike: 6, building: 7, sidewalk: 8, deck: 9 };
const grid = new Uint8Array(WIDTH * HEIGHT).fill(G.slab);
const owner = new Int32Array(WIDTH * HEIGHT).fill(-1); // building index per cell

function fillPolygon(pts, fn) {
  let minY = Infinity, maxY = -Infinity;
  for (const [, y] of pts) {
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const y0 = Math.max(0, Math.floor(minY));
  const y1 = Math.min(HEIGHT - 1, Math.ceil(maxY));
  for (let y = y0; y <= y1; y++) {
    const cy = y + 0.5;
    const xs = [];
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i];
      const [xj, yj] = pts[j];
      if (yi > cy !== yj > cy) xs.push(xi + ((cy - yi) / (yj - yi)) * (xj - xi));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const a = Math.max(0, Math.ceil(xs[k] - 0.5));
      const b = Math.min(WIDTH - 1, Math.floor(xs[k + 1] - 0.5));
      for (let x = a; x <= b; x++) fn(x, y);
    }
  }
}

// A thick line (a road or path) as cells within half a width of the segment.
function fillSegment(a, b, half, fn) {
  const minX = Math.max(0, Math.floor(Math.min(a[0], b[0]) - half));
  const maxX = Math.min(WIDTH - 1, Math.ceil(Math.max(a[0], b[0]) + half));
  const minY = Math.max(0, Math.floor(Math.min(a[1], b[1]) - half));
  const maxY = Math.min(HEIGHT - 1, Math.ceil(Math.max(a[1], b[1]) + half));
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy || 1;
  for (let y = minY; y <= maxY; y++)
    for (let x = minX; x <= maxX; x++) {
      const px = x + 0.5 - a[0];
      const py = y + 0.5 - a[1];
      const t = Math.max(0, Math.min(1, (px * dx + py * dy) / L2));
      const ex = px - t * dx;
      const ey = py - t * dy;
      const d = Math.hypot(ex, ey);
      if (d <= half) fn(x, y, d);
    }
}

const ways = osm.elements.filter((e) => e.type === 'way' && e.geometry);
const geo = (e) => e.geometry.map((p) => project(p.lat, p.lon));
const inside = (p) => p[0] > -50 && p[1] > -50 && p[0] < WIDTH + 50 && p[1] < HEIGHT + 50;
const relevant = (pts) => pts.some(inside);

// Grass and parks.
const GRASSY = { leisure: ['park', 'garden', 'playground'], landuse: ['grass', 'recreation_ground', 'cemetery', 'village_green', 'meadow'], natural: ['wood', 'scrub', 'grassland'] };
for (const e of ways) {
  const t = e.tags || {};
  if (!Object.entries(GRASSY).some(([k, v]) => v.includes(t[k]))) continue;
  const pts = geo(e);
  if (relevant(pts)) fillPolygon(pts, (x, y) => (grid[y * WIDTH + x] = G.grass));
}
// Water: the river polygon (a multipolygon relation) and ponds.
for (const e of osm.elements) {
  const t = e.tags || {};
  if (t.natural !== 'water') continue;
  const rings = e.type === 'relation' ? (e.members || []).filter((m) => m.role === 'outer' && m.geometry).map((m) => m.geometry) : e.geometry ? [e.geometry] : [];
  // Outer members of the river are open pieces: join them into rings.
  for (const ring of joinRings(rings)) {
    const pts = ring.map((p) => project(p.lat, p.lon));
    if (relevant(pts)) fillPolygon(pts, (x, y) => (grid[y * WIDTH + x] = G.water));
  }
}
function joinRings(pieces) {
  const left = pieces.map((p) => p.slice());
  const out = [];
  const same = (a, b) => Math.abs(a.lat - b.lat) < 1e-9 && Math.abs(a.lon - b.lon) < 1e-9;
  while (left.length) {
    let ring = left.shift();
    let grew = true;
    while (grew && !same(ring[0], ring[ring.length - 1])) {
      grew = false;
      for (let i = 0; i < left.length; i++) {
        const p = left[i];
        const end = ring[ring.length - 1];
        if (same(end, p[0])) ring = ring.concat(p.slice(1));
        else if (same(end, p[p.length - 1])) ring = ring.concat(p.slice(0, -1).reverse());
        else continue;
        left.splice(i, 1);
        grew = true;
        break;
      }
    }
    out.push(ring);
  }
  return out;
}

// Roads: carriageway width, sidewalks, bike lanes; footways and cycleways.
const ROAD = { primary: 12, secondary: 11, tertiary: 9.5, secondary_link: 7, tertiary_link: 7, primary_link: 7, residential: 7, unclassified: 7, living_street: 6, service: 4.5 };
const roads = [];
const bridges = [];
for (const e of ways) {
  const t = e.tags || {};
  const hw = t.highway;
  if (!hw) continue;
  const pts = geo(e);
  if (!relevant(pts)) continue;
  const isBridge = t.bridge && t.bridge !== 'no';
  if (ROAD[hw] && !(hw === 'service' && t.service === 'parking_aisle')) {
    const w = ROAD[hw];
    const bike = ['primary', 'secondary', 'tertiary'].includes(hw) || /lane|track/.test(t.cycleway || '') || /lane|track/.test(t['cycleway:both'] || '');
    const side = hw === 'service' ? 1.2 : 3;
    roads.push({ kind: hw, w, bike, pts, bridge: !!isBridge, name: t.name || '' });
    if (isBridge) bridges.push({ pts, w: w + side * 2 });
  } else if (hw === 'pedestrian' || hw === 'footway' || hw === 'path' || hw === 'steps' || hw === 'cycleway') {
    roads.push({ kind: hw, w: hw === 'pedestrian' ? 7 : hw === 'cycleway' ? 2.6 : 2.4, pts, bridge: !!isBridge, foot: true });
    if (isBridge) bridges.push({ pts, w: hw === 'pedestrian' ? 7 : 3, foot: true });
  }
}
// Sidewalks first (wider), then the roads on top, then bike lanes at the edges.
const set = (cls, keepWater) => (x, y) => {
  const i = y * WIDTH + x;
  if (keepWater && grid[i] === G.water) return;
  grid[i] = cls;
};
for (const r of roads)
  if (!r.foot) for (let k = 0; k + 1 < r.pts.length; k++) fillSegment(r.pts[k], r.pts[k + 1], r.w / 2 + (r.kind === 'service' ? 1.2 : 3), set(G.sidewalk, !r.bridge));
for (const r of roads)
  if (r.foot) for (let k = 0; k + 1 < r.pts.length; k++) fillSegment(r.pts[k], r.pts[k + 1], r.w / 2, (x, y) => {
    const i = y * WIDTH + x;
    if (grid[i] === G.water && !r.bridge) return;
    if (grid[i] === G.road || grid[i] === G.bike) return;
    grid[i] = r.kind === 'cycleway' ? G.bike : r.kind === 'pedestrian' ? G.sidewalk : grid[i] === G.water ? G.deck : G.path;
  });
for (const r of roads)
  if (!r.foot) for (let k = 0; k + 1 < r.pts.length; k++) fillSegment(r.pts[k], r.pts[k + 1], r.w / 2, (x, y, d) => {
    const i = y * WIDTH + x;
    if (grid[i] === G.water && !r.bridge) return;
    grid[i] = r.bike && d > r.w / 2 - 1.7 ? G.bike : G.road;
  });

// Buildings: cells per OSM building (not over roads or water).
const buildings = [];
const LANDMARK = { 24433739: 'slottet', 769941546: 'domkyrkan' };
const shopsAt = [];
for (const e of osm.elements) {
  const t = e.tags || {};
  if (e.type === 'node' && (t.shop || ['cafe', 'restaurant', 'fast_food', 'bar', 'pub', 'ice_cream', 'pharmacy'].includes(t.amenity))) shopsAt.push(project(e.lat, e.lon));
}
for (const e of osm.elements) {
  const t = e.tags || {};
  if (!t.building || ['roof', 'construction', 'no'].includes(t.building)) continue;
  const rings = e.type === 'relation' ? joinRings((e.members || []).filter((m) => m.role === 'outer' && m.geometry).map((m) => m.geometry)) : e.geometry ? [e.geometry] : [];
  if (!rings.length) continue;
  const id = buildings.length;
  const levels = parseFloat(t['building:levels']) || 0;
  const b = { id, osm: e.id, landmark: LANDMARK[e.id] || null, levels, kind: t.building, name: t.name || '', cells: 0 };
  for (const ring of rings) {
    const pts = ring.map((p) => project(p.lat, p.lon));
    if (!relevant(pts)) continue;
    fillPolygon(pts, (x, y) => {
      const i = y * WIDTH + x;
      if (grid[i] === G.road || grid[i] === G.water || grid[i] === G.bike) return;
      grid[i] = G.building;
      owner[i] = id;
      b.cells++;
    });
    if (b.landmark) b.outline = pts.map(([x, y]) => [+x.toFixed(1), +y.toFixed(1)]);
  }
  buildings.push(b);
}

// Greedy rectangles per building: the collision boxes and the house parts.
const used = new Uint8Array(WIDTH * HEIGHT);
const parts = [];
for (let y = 0; y < HEIGHT; y++)
  for (let x = 0; x < WIDTH; x++) {
    const i = y * WIDTH + x;
    const id = owner[i];
    if (id < 0 || used[i]) continue;
    let xe = x;
    while (xe + 1 < WIDTH && owner[y * WIDTH + xe + 1] === id && !used[y * WIDTH + xe + 1]) xe++;
    let ye = y;
    grow: while (ye + 1 < HEIGHT) {
      for (let k = x; k <= xe; k++) if (owner[(ye + 1) * WIDTH + k] !== id || used[(ye + 1) * WIDTH + k]) break grow;
      ye++;
    }
    for (let yy = y; yy <= ye; yy++) used.fill(1, yy * WIDTH + x, yy * WIDTH + xe + 1);
    const w = xe - x + 1;
    const h = ye - y + 1;
    // Slivers are not worth a house; the cells stay solid ground.
    if (w < 3 || h < 3) {
      for (let yy = y; yy <= ye; yy++) for (let xx = x; xx <= xe; xx++) grid[yy * WIDTH + xx] = G.slab;
      continue;
    }
    parts.push({ b: id, x, y, w, h });
  }
// Landmarks are drawn as their own models; the ground under their outlines is paving.
for (let i = 0; i < owner.length; i++) if (owner[i] >= 0 && buildings[owner[i]].landmark) grid[i] = G.slab;
// Heights: from the levels, otherwise four to six floors in the centre.
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (const b of buildings) {
  const area = b.cells;
  const floors = b.levels ? Math.max(1, Math.min(7, Math.round(b.levels))) : area < 60 ? 1 : area < 200 ? 2 + Math.floor(rnd() * 2) : 3 + Math.floor(rnd() * 3);
  b.floors = floors;
  b.facade = Math.floor(rnd() * 7);
  b.roof = rnd() < 0.7 ? 'gable' : 'mansard';
  b.seed = +rnd().toFixed(4);
}
for (const [sx, sy] of shopsAt) {
  const x = Math.round(sx);
  const y = Math.round(sy);
  for (let r = 0; r < 6; r++)
    for (const [dx, dy] of [[r, 0], [-r, 0], [0, r], [0, -r]]) {
      const i = (y + dy) * WIDTH + (x + dx);
      if (i >= 0 && i < owner.length && owner[i] >= 0) {
        buildings[owner[i]].shop = true;
        r = 99;
        break;
      }
    }
}

// ---------- points: trees, lamps, benches, bins, bike racks ----------
const trees = [];
const lamps = [];
const props = [];
const free = (x, y, r = 1) => {
  for (let yy = Math.floor(y - r); yy <= Math.ceil(y + r); yy++)
    for (let xx = Math.floor(x - r); xx <= Math.ceil(x + r); xx++) {
      if (xx < 0 || yy < 0 || xx >= WIDTH || yy >= HEIGHT) return false;
      const g = grid[yy * WIDTH + xx];
      if (g === G.building || g === G.water || g === G.road || g === G.bike) return false;
    }
  return true;
};
for (const e of osm.elements) {
  if (e.type !== 'node') continue;
  const t = e.tags || {};
  const [x, y] = project(e.lat, e.lon);
  if (x < 2 || y < 2 || x > WIDTH - 2 || y > HEIGHT - 2) continue;
  if (t.natural === 'tree' && free(x, y, 1)) trees.push({ x: +x.toFixed(1), y: +y.toFixed(1), r: 0.4, canopy: 2.4 + rnd() * 1.2 });
  else if (t.highway === 'street_lamp' && free(x, y, 0.5)) lamps.push({ x: +x.toFixed(1), y: +y.toFixed(1), r: 0.2, ax: 0, ay: 1 });
  else if (t.amenity === 'bench' && free(x, y, 1)) props.push({ kind: 'bench', x: +x.toFixed(1), y: +y.toFixed(1), rot: Math.round(rnd() * 2) * (Math.PI / 2) });
  else if (t.amenity === 'waste_basket' && free(x, y, 0.5)) props.push({ kind: 'bin', x: +x.toFixed(1), y: +y.toFixed(1) });
  else if (t.amenity === 'bicycle_parking' && free(x, y, 1.5)) props.push({ kind: 'rack', x: +x.toFixed(1), y: +y.toFixed(1), rot: 0, n: 3 + Math.floor(rnd() * 4) });
}
// Lamps along the drivable roads, on the sidewalk, arm over the road.
const roadSegments = [];
for (const r of roads) {
  if (r.foot || r.kind === 'service') continue;
  for (let k = 0; k + 1 < r.pts.length; k++) roadSegments.push({ a: r.pts[k], b: r.pts[k + 1], w: r.w, kind: r.kind, bike: r.bike, bridge: r.bridge });
}
const nearLamp = (x, y, d) => lamps.some((l) => Math.hypot(l.x - x, l.y - y) < d);
for (const s of roadSegments) {
  const dx = s.b[0] - s.a[0];
  const dy = s.b[1] - s.a[1];
  const L = Math.hypot(dx, dy);
  if (L < 8) continue;
  const nx = -dy / L;
  const ny = dx / L;
  let side = 1;
  for (let t = 6; t < L - 4; t += 26) {
    side = -side;
    const off = s.w / 2 + 0.7;
    const x = s.a[0] + (dx * t) / L + nx * off * side;
    const y = s.a[1] + (dy * t) / L + ny * off * side;
    if (!free(x, y, 0.4) || nearLamp(x, y, 12)) continue;
    lamps.push({ x: +x.toFixed(1), y: +y.toFixed(1), r: 0.2, ax: +(-nx * side).toFixed(3), ay: +(-ny * side).toFixed(3) });
  }
}

// Parked cars along the curbs (between the bike lane and the traffic).
const parked = [];
const COLORS = [0xb0b6bc, 0x3a78c8, 0x6a6f78, 0xd9dcdf, 0xf3f3f1, 0xc8382c, 0x2f9a90, 0x7a8b55, 0x7f95b0, 0xb07f7f];
const nearRoadEnd = (x, y) => roadSegments.some((s) => (Math.hypot(s.a[0] - x, s.a[1] - y) < 14 || Math.hypot(s.b[0] - x, s.b[1] - y) < 14));
for (const s of roadSegments) {
  if (!['residential', 'tertiary', 'secondary', 'unclassified'].includes(s.kind) || s.bridge) continue;
  const dx = s.b[0] - s.a[0];
  const dy = s.b[1] - s.a[1];
  const L = Math.hypot(dx, dy);
  if (L < 20) continue;
  const nx = -dy / L;
  const ny = dx / L;
  const head = Math.atan2(dy, dx);
  for (const side of [-1, 1])
    for (let t = 8; t < L - 8; t += 6.2 + rnd() * 3) {
      if (rnd() < 0.85) continue;
      const off = s.w / 2 - (s.bike ? 1.7 : 0) - 1.15;
      const x = s.a[0] + (dx * t) / L + nx * off * side;
      const y = s.a[1] + (dy * t) / L + ny * off * side;
      if (nearRoadEnd(x, y) || parked.some((c) => Math.hypot(c.x - x, c.y - y) < 5.5)) continue;
      const r = rnd();
      parked.push({ x: +x.toFixed(2), y: +y.toFixed(2), heading: +(side > 0 ? head + Math.PI : head).toFixed(3), type: r < 0.06 ? 'sport' : r < 0.35 ? 'small' : 'car', color: COLORS[Math.floor(rnd() * COLORS.length)] });
    }
}

// ---------- places: landmarks, health centres, police, the start ----------
const P = (lat, lon) => project(lat, lon).map((v) => +v.toFixed(1));
const places = {
  domkyrkan: P(59.85815, 17.6336),
  slottet: P(59.85363, 17.6352),
  gunillaklockan: P(59.8547, 17.6383),
  // Real health centre and police station positions; names in the game are invented.
  vardcentraler: [P(59.8601317, 17.6356793), P(59.8541, 17.6448)],
  polis: P(59.8653064, 17.6309082),
  // First mission: the sandwich kiosk by Stora torget and a nation by the river.
  kiosk: P(59.8586, 17.6388),
  nation: P(59.8566, 17.6378),
};
// Snap a place to the nearest free sidewalk cell.
function snap([x, y]) {
  for (let r = 0; r < 60; r++)
    for (let a = 0; a < 16; a++) {
      const xx = Math.round(x + r * Math.cos((a / 16) * Math.PI * 2));
      const yy = Math.round(y + r * Math.sin((a / 16) * Math.PI * 2));
      if (xx < 1 || yy < 1 || xx >= WIDTH - 1 || yy >= HEIGHT - 1) continue;
      const g = grid[yy * WIDTH + xx];
      if ((g === G.sidewalk || g === G.slab || g === G.path) && free(xx, yy, 1)) return [xx + 0.5, yy + 0.5];
    }
  return [x, y];
}
places.slottsgard = P(59.8536, 17.6372); // in front of the castle, on Slottsbacken
for (const k of ['kiosk', 'nation', 'polis', 'gunillaklockan', 'slottsgard']) places[k] = snap(places[k]);
places.vardcentraler = places.vardcentraler.map(snap);
// The start: on the sidewalk of a road near the cathedral, a bike beside the
// player, an ordinary car in the lane and a sports car across the street.
let start = null;
{
  const [cx, cy] = places.domkyrkan;
  let best = null;
  for (const s of roadSegments) {
    if (!['residential', 'tertiary', 'secondary', 'unclassified'].includes(s.kind) || s.bridge) continue;
    const dx = s.b[0] - s.a[0];
    const dy = s.b[1] - s.a[1];
    const L = Math.hypot(dx, dy);
    if (L < 60) continue;
    const mx = (s.a[0] + s.b[0]) / 2;
    const my = (s.a[1] + s.b[1]) / 2;
    const d = Math.hypot(mx - cx, my - cy);
    if (d > 60 && (!best || d < best.d)) best = { s, d, L, dx, dy, mx, my };
  }
  const { s, L, dx, dy, mx, my } = best;
  const fx = dx / L;
  const fy = dy / L;
  const nx = -fy;
  const ny = fx;
  const head = Math.atan2(dy, dx);
  const off = s.w / 2 + 1.5;
  const lane = s.w / 2 - (s.bike ? 1.7 : 0) - 1.15;
  start = {
    player: { x: +(mx + nx * off).toFixed(2), y: +(my + ny * off).toFixed(2), heading: +head.toFixed(3) },
    bike: { x: +(mx + nx * off + fx * 1.9).toFixed(2), y: +(my + ny * off + fy * 1.9).toFixed(2), heading: +head.toFixed(3) },
    car: { x: +(mx + nx * lane + fx * 9).toFixed(2), y: +(my + ny * lane + fy * 9).toFixed(2), heading: +(head + Math.PI).toFixed(3), type: 'car', color: 0x7f95b0 },
    sport: { x: +(mx - nx * lane + fx * 3).toFixed(2), y: +(my - ny * lane + fy * 3).toFixed(2), heading: +head.toFixed(3), type: 'sport', color: 0xd23c32 },
  };
  // Keep the start clear of parked cars and lamps.
  const clear = (o) => [start.player, start.car, start.sport, start.bike].every((q) => Math.hypot(q.x - o.x, q.y - o.y) > 7);
  for (let i = parked.length - 1; i >= 0; i--) if (!clear(parked[i])) parked.splice(i, 1);
  for (let i = lamps.length - 1; i >= 0; i--) if (!clear(lamps[i])) lamps.splice(i, 1);
}

// ---------- write ----------
// Ground grid as run lengths: [type, count, type, count, ...].
const rle = [];
let cur = grid[0];
let n = 0;
for (let i = 0; i < grid.length; i++) {
  if (grid[i] === cur && n < 65535) n++;
  else {
    rle.push(cur, n);
    cur = grid[i];
    n = 1;
  }
}
rle.push(cur, n);
const round = (pts) => pts.map(([x, y]) => [+x.toFixed(1), +y.toFixed(1)]);
const out = {
  about: 'Central Uppsala for Fyriskaos, built by tools/build_map.mjs from OpenStreetMap. © OpenStreetMap contributors, ODbL 1.0.',
  width: WIDTH,
  height: HEIGHT,
  north: +NORTH.toFixed(4),
  ground: { types: G, rle: Buffer.from(Uint16Array.from(rle).buffer).toString('base64') },
  buildings: buildings.filter((b) => b.cells).map(({ id, landmark, floors, facade, roof, seed: s, shop, kind, outline }) => ({ id, landmark, floors, facade, roof, seed: s, shop: !!shop, kind, outline })),
  parts,
  roads: roads.filter((r) => relevant(r.pts)).map((r) => ({ kind: r.kind, w: r.w, bike: !!r.bike, bridge: r.bridge, foot: !!r.foot, pts: round(r.pts) })),
  bridges: bridges.map((b) => ({ w: b.w, foot: !!b.foot, pts: round(b.pts) })),
  trees,
  lamps,
  props,
  parked,
  places,
  start,
};
fs.mkdirSync(path.join(ROOT, 'data/map'), { recursive: true });
const file = path.join(ROOT, 'data/map/centrum.json');
fs.writeFileSync(file, JSON.stringify(out));
const count = (g) => grid.reduce((s, v) => s + (v === g ? 1 : 0), 0);
console.log(`${WIDTH} x ${HEIGHT} m, ${buildings.filter((b) => b.cells).length} buildings in ${parts.length} parts, ${roads.length} roads, ${bridges.length} bridges, ${trees.length} trees, ${lamps.length} lamps, ${props.length} props, ${parked.length} parked cars; water ${count(G.water)} m², road ${count(G.road)} m²; ${(fs.statSync(file).size / 1024).toFixed(0)} kB`);
