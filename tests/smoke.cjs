// Smoke test for prototype 1: the page starts without errors, and you can
// walk, take a bike, get in a car, drive and brake.
// Usage: node tests/smoke.cjs [screenshot-dir]
// Needs Playwright with Chromium and Python 3 (for a local web server).

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const shots = process.argv[2];
const port = 8000 + Math.floor(Math.random() * 1000);

function fail(msg) {
  console.error('FAIL:', msg);
  process.exitCode = 1;
}

(async () => {
  const server = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'], { cwd: root, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 800));
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
    const page = await context.newPage();
    if (process.env.SLOW) {
      // Pretend to be a slow machine (SLOW=6 means six times slower).
      const cdp = await context.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: Number(process.env.SLOW) });
    }
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(`http://127.0.0.1:${port}/index.html`);
    await page.waitForFunction(() => window.__fyriskaos, null, { timeout: 15000 });
    if (shots) {
      fs.mkdirSync(shots, { recursive: true });
      await page.screenshot({ path: path.join(shots, '1-start.png') });
    }
    await page.click('#btn-start');
    await page.waitForTimeout(200);
    await page.evaluate(() => document.fullscreenElement && document.exitFullscreen());
    await page.waitForTimeout(200);
    const startPos = await page.evaluate(() => ({ ...window.__fyriskaos.game.map.spawns.player }));

    const state = () =>
      page.evaluate(() => {
        const g = window.__fyriskaos.game;
        const p = g.player;
        const v = p.vehicle;
        return {
          x: p.x, y: p.y, stun: p.stun,
          vehicle: v ? v.type : null,
          speed: v ? Math.hypot(v.vx, v.vy) : Math.hypot(p.vx, p.vy),
          action: document.getElementById('btn-action').hidden ? null : document.getElementById('btn-action').textContent,
          brakeVisible: !document.getElementById('btn-brake').hidden,
        };
      });
    // Hold a key until the game reaches a state (or time runs out), so slow
    // machines that run fewer frames per second do not fail the test.
    const vehicleSpeed = () => page.evaluate(() => {
      const v = window.__fyriskaos.game.player.vehicle;
      return v ? Math.hypot(v.vx, v.vy) : 0;
    });
    const holdUntilSpeed = async (key, target, maxMs) => {
      await page.keyboard.down(key);
      const t0 = Date.now();
      while (Date.now() - t0 < maxMs && (await vehicleSpeed()) < target) await page.waitForTimeout(50);
      await page.keyboard.up(key);
    };
    const hold = async (key, ms) => {
      await page.keyboard.down(key);
      await page.waitForTimeout(ms);
      await page.keyboard.up(key);
    };

    let s0 = await state();
    if (s0.action !== 'Ta cykeln') fail(`expected "Ta cykeln" next to the start bike, got ${s0.action}`);

    // Walk left with the on-screen joystick (mouse drag on the left side).
    await page.mouse.move(200, 250);
    await page.mouse.down();
    await page.mouse.move(120, 250, { steps: 5 });
    await page.waitForTimeout(600);
    await page.mouse.up();
    let s1 = await state();
    if (!(s1.x < s0.x - 1)) fail(`joystick did not move the player (${s0.x} -> ${s1.x})`);
    if (shots) await page.screenshot({ path: path.join(shots, '2-walk.png') });

    // Back to the start, next to the bike, and take it.
    await page.evaluate((s) => Object.assign(window.__fyriskaos.game.player, { x: s.x, y: s.y, vx: 0, vy: 0 }), startPos);
    await page.waitForTimeout(100);
    let s2 = await state();
    if (s2.action !== 'Ta cykeln') fail(`not next to the bike after walking back (${s2.action})`);
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(100);
    let s3 = await state();
    if (s3.vehicle !== 'bike') fail('could not take the bike');
    if (!s3.brakeVisible) fail('brake button hidden on the bike');

    // Ride along the sidewalk.
    await holdUntilSpeed('ArrowRight', 5, 6000);
    let s4 = await state();
    if (!(s4.speed > 3)) fail(`bike too slow: ${s4.speed}`);
    if (shots) await page.screenshot({ path: path.join(shots, '3-bike.png') });
    await page.keyboard.down('Space');
    await page.waitForTimeout(1200);
    await page.keyboard.up('Space');
    let s5 = await state();
    if (s5.vehicle === 'bike' && s5.speed > 0.5) fail(`bike did not stop when braking: ${s5.speed}`);
    if (s5.vehicle === 'bike') await page.keyboard.press('KeyE');
    await page.waitForTimeout(1500);

    // Put the player next to the start car and drive it.
    await page.evaluate(() => {
      const g = window.__fyriskaos.game;
      const car = g.vehicles.find((v) => v.type === 'car' && Math.abs(v.x - 211) < 1 && Math.abs(v.y - 255.7) < 1);
      g.player.x = car.x;
      g.player.y = car.y - 1.6;
      g.player.vx = g.player.vy = 0;
      g.player.stun = 0;
    });
    await page.waitForTimeout(100);
    let s6 = await state();
    if (s6.action !== 'Kliv in') fail(`expected "Kliv in" next to the car, got ${s6.action}`);
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(100);
    let s7 = await state();
    if (s7.vehicle !== 'car') fail('could not get in the car');
    await holdUntilSpeed('ArrowLeft', 14, 8000);
    let s8 = await state();
    if (!(s8.speed > 14)) fail(`car did not reach 50 km/h: ${s8.speed}`);
    if (!(s8.x < s7.x - 6)) fail('car did not drive left (west)');
    if (shots) await page.screenshot({ path: path.join(shots, '4-car.png') });
    // Turn by pointing the stick down: the car should turn towards it.
    await page.keyboard.down('ArrowDown');
    const tTurn = await page.evaluate(() => window.__fyriskaos.game.time);
    await page.waitForFunction((t0) => window.__fyriskaos.game.time - t0 > 0.8, tTurn, { timeout: 8000 });
    await page.keyboard.up('ArrowDown');
    const heading = await page.evaluate(() => window.__fyriskaos.game.player.vehicle.heading);
    if (!(Math.sin(heading) > 0.3)) fail(`car did not turn towards the stick (heading ${heading})`);
    await page.keyboard.down('Space');
    await page.waitForFunction(() => {
      const v = window.__fyriskaos.game.player.vehicle;
      return Math.hypot(v.vx, v.vy) < 0.5;
    }, null, { timeout: 8000 }).catch(() => {});
    await page.keyboard.up('Space');
    let s9 = await state();
    if (!(s9.speed < 0.5)) fail(`car did not stop when braking: ${s9.speed}`);
    if (s9.action !== 'Kliv ur') fail(`expected "Kliv ur" in the car, got ${s9.action}`);
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(100);
    let s10 = await state();
    if (s10.vehicle) fail('could not get out of the car');
    if (shots) await page.screenshot({ path: path.join(shots, '5-out.png') });

    // The sports car across the street: name in the corner, then a handbrake slide.
    await page.evaluate(() => {
      const g = window.__fyriskaos.game;
      const car = g.vehicles.find((v) => v.type === 'sport');
      Object.assign(g.player, { x: car.x - 3, y: car.y + 1.7, vx: 0, vy: 0, stun: 0 });
    });
    await page.waitForTimeout(100);
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(100);
    const sportName = await page.textContent('#speed');
    if (!/^Sportbil/.test(sportName)) fail(`expected the sports car, got "${sportName}"`);
    await holdUntilSpeed('ArrowRight', 16, 8000);
    const before = await page.evaluate(() => window.__fyriskaos.game.player.vehicle.heading);
    await page.keyboard.down('Space');
    await page.keyboard.down('ArrowUp');
    const tSlide = await page.evaluate(() => window.__fyriskaos.game.time);
    await page.waitForFunction((t0) => window.__fyriskaos.game.time - t0 > 0.45, tSlide, { timeout: 8000 });
    const slide = await page.evaluate(() => {
      const v = window.__fyriskaos.game.player.vehicle;
      return { handbrake: v.handbrake, heading: v.heading, speed: Math.hypot(v.vx, v.vy) };
    });
    if (shots) await page.screenshot({ path: path.join(shots, '6-handbrake.png') });
    await page.keyboard.up('Space');
    await page.keyboard.up('ArrowUp');
    if (!(before - slide.heading > 0.6)) fail(`handbrake did not swing the car round (${before} -> ${slide.heading})`);
    if (!(slide.speed > 5)) fail(`handbrake stopped the car dead (${slide.speed})`);

    // Portrait phone: ask to turn the phone.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    const rotate = await page.evaluate(() => getComputedStyle(document.getElementById('rotate')).display);
    if (rotate === 'none') fail('portrait hint not shown');

    if (errors.length) fail('errors on the page:\n' + errors.join('\n'));
    if (!process.exitCode) console.log('OK: start, joystick, bike, car, brake, get out, sports car, handbrake, portrait hint');
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
