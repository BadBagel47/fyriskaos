// Facing test (B-058): the player, the pedestrians and the bike (with its
// rider) look the way they move. The front is measured from the shapes
// themselves, not from the game's heading: for people the toes (the point of
// each foot farthest from its ankle), for the bike the handlebar and basket
// (the high, wide parts). Then it is turned into the world with the object's
// matrix and compared with the direction the thing actually moves.
// Usage: node tests/facing.cjs   (needs Playwright with Chromium and Python 3)

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = 8000 + Math.floor(Math.random() * 1000);

function fail(msg) {
  console.error('FAIL:', msg);
  process.exitCode = 1;
}

// Runs in the page: front directions (world x, z) of the figures and the bike.
function measure() {
  const F = window.__fyriskaos;
  const ents = F.renderer.ents;
  const pos = (geo) => geo.attributes.position;
  // Model-space front of a person: from each ankle to the toe of that foot.
  const personFront = (geo) => {
    const P = pos(geo);
    let H = 0;
    for (let i = 0; i < P.count; i++) H = Math.max(H, P.getY(i));
    let fx = 0;
    let fz = 0;
    for (const side of [-1, 1]) {
      let ax = 0, az = 0, n = 0;
      for (let i = 0; i < P.count; i++) {
        const y = P.getY(i);
        if (P.getZ(i) * side > 0 && y > 0.05 * H && y < 0.1 * H) {
          ax += P.getX(i);
          az += P.getZ(i);
          n++;
        }
      }
      if (!n) continue;
      ax /= n;
      az /= n;
      let best = -1, bx = 0, bz = 0;
      for (let i = 0; i < P.count; i++) {
        if (P.getZ(i) * side <= 0 || P.getY(i) > 0.04 * H) continue;
        const dx = P.getX(i) - ax;
        const dz = P.getZ(i) - az;
        const d = Math.hypot(dx, dz);
        if (d > best) [best, bx, bz] = [d, dx / d, dz / d];
      }
      fx += bx;
      fz += bz;
    }
    return [fx, fz];
  };
  // Model-space front of the bike: the high, wide parts (handlebar, basket)
  // against the middle of the bike.
  const bikeFront = (geo) => {
    const P = pos(geo);
    let H = 0, cx = 0, cz = 0;
    for (let i = 0; i < P.count; i++) {
      H = Math.max(H, P.getY(i));
      cx += P.getX(i);
      cz += P.getZ(i);
    }
    cx /= P.count;
    cz /= P.count;
    let hx = 0, hz = 0, n = 0;
    for (let i = 0; i < P.count; i++)
      if (P.getY(i) > 0.85 * H && Math.abs(P.getZ(i)) > 0.12) {
        hx += P.getX(i);
        hz += P.getZ(i);
        n++;
      }
    return [hx / n - cx, hz / n - cz];
  };
  // A model-space direction (x, z) into the world with a matrix (column-major elements).
  const toWorld = ([x, z], e) => {
    const wx = e[0] * x + e[8] * z;
    const wz = e[2] * x + e[10] * z;
    const l = Math.hypot(wx, wz) || 1;
    return [wx / l, wz / l];
  };
  const meshOf = (obj) => {
    let m = null;
    obj.traverse((o) => {
      if (!m && o.isMesh && o.visible) m = o;
    });
    return m;
  };
  const out = {};
  const g = F.game;
  const p = g.player;
  ents.player.updateMatrixWorld(true);
  const shown = ents.poses().find((o) => o.visible);
  const pm = shown && meshOf(shown);
  if (pm) out.player = toWorld(personFront(pm.geometry), pm.matrixWorld.elements);
  const v = p.vehicle;
  if (v) {
    const root = ents.views.get(v);
    root.updateMatrixWorld(true);
    const bm = meshOf(root);
    out.bike = toWorld(bikeFront(bm.geometry), bm.matrixWorld.elements);
  }
  // Pedestrians: the instances are filled in the order of the list, per kind.
  const sets = ents.crowd.sets;
  out.peds = [];
  if (sets) {
    const count = [0, 0];
    const fronts = sets.map((s) => personFront(s.body.geometry));
    const m = new (sets[0].body.matrixWorld.constructor)();
    for (const q of F.play.state.peds) {
      const i = count[q.kind]++;
      if (q.stand || q.down > 0 || i >= sets[q.kind].body.count) continue;
      sets[q.kind].body.getMatrixAt(i, m);
      out.peds.push({ x: q.x, y: q.y, f: toWorld(fronts[q.kind], m.elements), pace: q.pace });
    }
  }
  return { out, x: v ? v.x : p.x, y: v ? v.y : p.y };
}

(async () => {
  const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 800));
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(`http://127.0.0.1:${port}/index.html`);
    await page.waitForFunction(() => window.__fyriskaos, null, { timeout: 60000 });
    await page.click('#btn-start');
    await page.evaluate(() => document.fullscreenElement && document.exitFullscreen());
    await page.waitForFunction(() => window.__fyriskaos.modelsReady && window.__fyriskaos.renderer.ents.crowd.sets, null, { timeout: 60000 });
    const gameTime = () => page.evaluate(() => window.__fyriskaos.game.time);
    // Wait for game time, so slow machines that draw fewer frames still pass.
    const waitGame = async (s) => {
      const t0 = await gameTime();
      await page.waitForFunction((t) => window.__fyriskaos.game.time > t, t0 + s, { timeout: 60000 });
    };
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
    const dirOf = (a, b) => {
      const l = Math.hypot(b.x - a.x, b.y - a.y);
      return l > 0.05 ? [(b.x - a.x) / l, (b.y - a.y) / l] : null;
    };

    // 1. The player walks in four directions and faces each.
    for (const [key, name] of [['ArrowLeft', 'left'], ['ArrowUp', 'up'], ['ArrowRight', 'right'], ['ArrowDown', 'down']]) {
      await page.keyboard.down(key);
      await waitGame(0.5);
      const a = await page.evaluate(measure);
      await waitGame(0.15);
      const b = await page.evaluate(measure);
      await page.keyboard.up(key);
      const d = dirOf(a, b);
      if (!d) fail(`player did not walk ${name}`);
      else if (!b.out.player) fail('no player figure to measure');
      else if (dot(d, b.out.player) < 0.9) fail(`player walking ${name} faces away from the way it moves (cos ${dot(d, b.out.player).toFixed(2)})`);
    }

    // 2. Pedestrians face the way they walk (positions a few frames apart).
    await waitGame(1);
    const a = await page.evaluate(measure);
    await waitGame(0.2);
    const b = await page.evaluate(measure);
    let checked = 0;
    let wrong = 0;
    for (const q of b.out.peds) {
      const was = a.out.peds.find((r) => Math.hypot(r.x - q.x, r.y - q.y) < 1);
      const d = was && dirOf(was, q);
      if (!d || q.pace < 0.5) continue;
      checked++;
      if (dot(d, q.f) < 0.85) wrong++;
    }
    if (checked < 5) fail(`too few walking pedestrians to check (${checked})`);
    if (wrong) fail(`${wrong} of ${checked} pedestrians walk backwards or sideways`);

    // 3. On the bike: the bike and the rider face the way they ride.
    await page.evaluate(() => {
      const g = window.__fyriskaos.game;
      const s = g.map.spawns.player;
      Object.assign(g.player, { x: s.x, y: s.y, vx: 0, vy: 0 });
    });
    await waitGame(0.2);
    await page.keyboard.press('KeyE');
    await waitGame(0.2);
    const onBike = await page.evaluate(() => window.__fyriskaos.game.player.vehicle?.spec.class === 'bike');
    if (!onBike) fail('could not take the bike');
    else {
      await page.keyboard.down('ArrowUp');
      await waitGame(1.2);
      const c = await page.evaluate(measure);
      await waitGame(0.15);
      const e = await page.evaluate(measure);
      await page.keyboard.up('ArrowUp');
      const d = dirOf(c, e);
      if (!d) fail('bike did not move');
      else {
        if (dot(d, e.out.bike) < 0.9) fail(`bike faces away from the way it rides (cos ${dot(d, e.out.bike).toFixed(2)})`);
        if (dot(d, e.out.player) < 0.9) fail(`rider faces away from the way the bike rides (cos ${dot(d, e.out.player).toFixed(2)})`);
      }
    }
    if (errors.length) fail('errors on the page:\n' + errors.join('\n'));
    if (!process.exitCode) console.log(`OK: facing of the player (4 directions), ${checked} pedestrians, the bike and its rider`);
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
