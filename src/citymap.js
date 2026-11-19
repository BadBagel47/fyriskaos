// Load the map of central Uppsala (F-005), built by tools/build_map.mjs from
// OpenStreetMap, and turn it into what the simulation and the renderer use:
// collision rectangles for houses and water, a ground grid, trees, lamps,
// furniture, roads, places and where everything starts.
// Map data © OpenStreetMap contributors, ODbL.

export async function loadCityMap(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`map ${res.status}`);
  return cityMap(await res.json());
}

export function cityMap(d) {
  const { width, height } = d;
  // Ground types per square metre, from run lengths.
  const bin = atob(d.ground.rle);
  const u16 = new Uint16Array(bin.length / 2);
  for (let i = 0; i < u16.length; i++) u16[i] = bin.charCodeAt(i * 2) | (bin.charCodeAt(i * 2 + 1) << 8);
  const cells = new Uint8Array(width * height);
  let o = 0;
  for (let i = 0; i < u16.length; i += 2) {
    cells.fill(u16[i], o, o + u16[i + 1]);
    o += u16[i + 1];
  }
  const G = d.ground.types;
  // Water as rectangles for collisions (row runs merged downwards).
  const water = [];
  {
    const used = new Uint8Array(width * height);
    for (let y = 0; y < height; y++)
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        if (cells[i] !== G.water || used[i]) continue;
        let xe = x;
        while (xe + 1 < width && cells[i + xe + 1 - x] === G.water && !used[i + xe + 1 - x]) xe++;
        let ye = y;
        grow: while (ye + 1 < height) {
          for (let k = x; k <= xe; k++) if (cells[(ye + 1) * width + k] !== G.water || used[(ye + 1) * width + k]) break grow;
          ye++;
        }
        for (let yy = y; yy <= ye; yy++) used.fill(1, yy * width + x, yy * width + xe + 1);
        water.push({ x, y, w: xe - x + 1, h: ye - y + 1 });
      }
  }
  const houses = d.buildings;
  const byId = new Map(houses.map((b) => [b.id, b]));
  for (const b of houses) b.parts = 0;
  for (const p of d.parts) byId.get(p.b).parts++;
  // Each part is a collision box and a house block.
  const buildings = d.parts.map((p) => {
    const b = byId.get(p.b);
    return { x: p.x, y: p.y, w: p.w, h: p.h, house: b, height: b.floors * 3.2 + 1, landmark: b.landmark };
  });
  // Gunillaklockan stands on its own (not an OSM building here): a solid box.
  const g = d.places.gunillaklockan;
  if (g) buildings.push({ x: g[0] - 3.2, y: g[1] - 3.2, w: 6.4, h: 6.4, house: null, height: 16, landmark: 'gunillaklockan' });
  const s = d.start;
  const cars = [s.car, s.sport, ...d.parked];
  return {
    kind: 'city',
    width,
    height,
    north: d.north,
    cells,
    G,
    cellAt(x, y) {
      const cx = Math.floor(x);
      const cy = Math.floor(y);
      return cx < 0 || cy < 0 || cx >= width || cy >= height ? 0 : cells[cy * width + cx];
    },
    buildings,
    houses,
    water,
    grass: [],
    paths: [],
    trees: d.trees,
    lamps: d.lamps,
    props: d.props,
    roads: d.roads,
    bridges: d.bridges,
    places: d.places,
    start: s,
    spawns: { player: s.player, cars, bikes: [s.bike] },
  };
}
