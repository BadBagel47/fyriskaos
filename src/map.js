// The grey test map for prototype 1: a small grid town with a river,
// three bridges, a park and parked cars and bikes. Generated from a seed.

import { CAR_COLORS, BIKE_COLORS } from './config.js';

export function makeRng(seed) {
  // mulberry32: small, fast and the same on every device
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ROAD_HALF = 6; // two lanes of 6 m
const SIDEWALK = 3;
const EDGE = ROAD_HALF + SIDEWALK;

export function buildTestMap(seed = 1) {
  const rng = makeRng(seed);
  const width = 560;
  const height = 400;
  const vRoads = [40, 160, 280, 400, 520];
  const hRoads = [40, 140, 260, 360];
  const river = { y0: 185, y1: 215 };
  const bank = 10; // grass strip along the river
  const bridgeXs = [40, 280, 520];

  const roads = [];
  for (const y of hRoads) roads.push({ x: 0, y: y - ROAD_HALF, w: width, h: ROAD_HALF * 2, dir: 'h', c: y });
  for (const x of vRoads) {
    if (bridgeXs.includes(x)) {
      roads.push({ x: x - ROAD_HALF, y: 0, w: ROAD_HALF * 2, h: height, dir: 'v', c: x });
    } else {
      roads.push({ x: x - ROAD_HALF, y: 0, w: ROAD_HALF * 2, h: river.y0 - bank, dir: 'v', c: x });
      roads.push({ x: x - ROAD_HALF, y: river.y1 + bank, w: ROAD_HALF * 2, h: height - river.y1 - bank, dir: 'v', c: x });
    }
  }

  const bridges = bridgeXs.map((x) => ({ x: x - EDGE, y: river.y0, w: EDGE * 2, h: river.y1 - river.y0 }));

  const water = [];
  let wx = 0;
  for (const b of bridges) {
    water.push({ x: wx, y: river.y0, w: b.x - wx, h: river.y1 - river.y0 });
    wx = b.x + b.w;
  }
  water.push({ x: wx, y: river.y0, w: width - wx, h: river.y1 - river.y0 });

  const grass = [
    { x: 0, y: river.y0 - bank, w: width, h: bank },
    { x: 0, y: river.y1, w: width, h: bank },
  ];

  // Blocks between the roads.
  const xs = [0, ...vRoads, width];
  const ys = [0, ...hRoads, height];
  const blocks = [];
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      const x0 = xs[i] + (i === 0 ? 0 : EDGE);
      const x1 = xs[i + 1] - (i + 1 === xs.length - 1 ? 0 : EDGE);
      let y0 = ys[j] + (j === 0 ? 0 : EDGE);
      let y1 = ys[j + 1] - (j + 1 === ys.length - 1 ? 0 : EDGE);
      // The river cuts the middle row of blocks in two.
      if (y0 < river.y0 && y1 > river.y1) {
        blocks.push({ x: x0, y: y0, w: x1 - x0, h: river.y0 - bank - y0 });
        blocks.push({ x: x0, y: river.y1 + bank, w: x1 - x0, h: y1 - river.y1 - bank });
      } else {
        blocks.push({ x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
      }
    }
  }

  // One block becomes the park.
  const parkBlock = blocks.find((b) => b.x > 280 && b.x < 300 && b.y > 260 && b.y < 280);
  const park = parkBlock;
  const paths = [];
  const trees = [];
  if (park) {
    grass.push({ ...park });
    paths.push({ x: park.x, y: park.y + park.h / 2 - 1.5, w: park.w, h: 3 });
    paths.push({ x: park.x + park.w / 2 - 1.5, y: park.y, w: 3, h: park.h });
    for (let k = 0; k < 26; k++) {
      const tx = park.x + 5 + rng() * (park.w - 10);
      const ty = park.y + 5 + rng() * (park.h - 10);
      const nearPath = Math.abs(ty - (park.y + park.h / 2)) < 5 || Math.abs(tx - (park.x + park.w / 2)) < 5;
      if (nearPath) continue;
      if (trees.some((t) => Math.hypot(t.x - tx, t.y - ty) < 7)) continue;
      trees.push({ x: tx, y: ty, r: 0.4, canopy: 2.2 + rng() * 1.4 });
    }
  }
  // Trees along the river banks.
  for (let x = 12; x < width; x += 18 + rng() * 10) {
    if (bridges.some((b) => x > b.x - 4 && x < b.x + b.w + 4)) continue;
    trees.push({ x, y: river.y0 - bank / 2 - 2, r: 0.4, canopy: 2.4 + rng() });
    trees.push({ x: x + 6, y: river.y1 + bank / 2 + 2, r: 0.4, canopy: 2.4 + rng() });
  }

  // Buildings: each block is split into lots along its longer side.
  const buildings = [];
  for (const b of blocks) {
    if (b === park) continue;
    if (b.w < 8 || b.h < 8) continue;
    const alongX = b.w >= b.h;
    const total = alongX ? b.w : b.h;
    let pos = 0;
    while (pos < total - 6) {
      const lot = Math.min(total - pos, 12 + rng() * 18);
      const gap = rng() < 0.35 ? 4 : 0; // sometimes an alley you can walk through
      const inset = 0.5 + rng() * 1.5;
      const len = lot - gap;
      if (len < 6) break;
      const depth = (alongX ? b.h : b.w) - inset * 2;
      const h = 8 + rng() * 14;
      if (alongX) buildings.push({ x: b.x + pos + gap / 2, y: b.y + inset, w: len, h: depth, height: h, seed: rng() });
      else buildings.push({ x: b.x + inset, y: b.y + pos + gap / 2, w: depth, h: len, height: h, seed: rng() });
      pos += lot;
    }
  }

  // Parked cars along the curbs, away from crossings.
  const cars = [];
  const bikes = [];
  const nearCrossing = (v, list) => list.some((c) => Math.abs(v - c) < EDGE + 4);
  for (const r of roads) {
    if (r.dir === 'h') {
      for (let x = r.x + 8; x < r.x + r.w - 8; x += 22 + rng() * 40) {
        if (nearCrossing(x, vRoads)) continue;
        const side = rng() < 0.5 ? -1 : 1;
        // Right-hand traffic: cars on the north side face west.
        cars.push({ x, y: r.c + side * 4.3, heading: side < 0 ? Math.PI : 0, color: pick(rng, CAR_COLORS) });
      }
    } else {
      for (let y = r.y + 8; y < r.y + r.h - 8; y += 26 + rng() * 40) {
        if (nearCrossing(y, hRoads)) continue;
        const side = rng() < 0.5 ? -1 : 1;
        cars.push({ x: r.c + side * 4.3, y, heading: side < 0 ? Math.PI / 2 : -Math.PI / 2, color: pick(rng, CAR_COLORS) });
      }
    }
  }
  // Bike racks on the sidewalks.
  for (let k = 0; k < 10; k++) {
    const r = roads[Math.floor(rng() * roads.length)];
    if (r.dir === 'h') {
      const x = r.x + 10 + rng() * (r.w - 20);
      if (nearCrossing(x, vRoads)) continue;
      const side = rng() < 0.5 ? -1 : 1;
      for (let n = 0; n < 2; n++) bikes.push({ x: x + n * 1.0, y: r.c + side * (ROAD_HALF + 1.6), heading: Math.PI / 2, color: pick(rng, BIKE_COLORS) });
    } else {
      const y = r.y + 10 + rng() * (r.h - 20);
      if (nearCrossing(y, hRoads)) continue;
      const side = rng() < 0.5 ? -1 : 1;
      for (let n = 0; n < 2; n++) bikes.push({ x: r.c + side * (ROAD_HALF + 1.6), y: y + n * 1.0, heading: 0, color: pick(rng, BIKE_COLORS) });
    }
  }

  // Start: on the sidewalk with a bike and a car right next to the player.
  const start = { x: 200, y: 260 - ROAD_HALF - 1.5, heading: 0 };
  const clear = (x, y, d) => (o) => Math.hypot(o.x - x, o.y - y) > d;
  const keptCars = cars.filter(clear(start.x + 10, start.y, 14));
  const keptBikes = bikes.filter(clear(start.x, start.y, 6));
  keptBikes.push({ x: start.x + 1.9, y: start.y - 0.2, heading: 0, color: BIKE_COLORS[0] });
  keptCars.push({ x: start.x + 11, y: 260 - 4.3, heading: Math.PI, color: CAR_COLORS[0] });

  return {
    seed,
    width,
    height,
    roads,
    vRoads,
    hRoads,
    roadHalf: ROAD_HALF,
    edge: EDGE,
    bridges,
    water,
    grass,
    paths,
    trees,
    buildings,
    spawns: { player: start, cars: keptCars, bikes: keptBikes },
  };
}

function pick(rng, list) {
  return list[Math.floor(rng() * list.length)];
}
