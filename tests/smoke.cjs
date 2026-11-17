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
    await hold('ArrowRight', 1500);
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
    await hold('ArrowLeft', 2500);
    let s8 = await state();
    if (!(s8.speed > 10)) fail(`car too slow after 2.5 s: ${s8.speed}`);
    if (!(s8.x < s7.x - 15)) fail('car did not drive left (west)');
    if (shots) await page.screenshot({ path: path.join(shots, '4-car.png') });
    // Turn by pointing the stick down: the car should turn towards it.
    await hold('ArrowDown', 800);
    const heading = await page.evaluate(() => window.__fyriskaos.game.player.vehicle.heading);
    if (!(Math.sin(heading) > 0.3)) fail(`car did not turn towards the stick (heading ${heading})`);
    await page.keyboard.down('Space');
    await page.waitForTimeout(2000);
    await page.keyboard.up('Space');
    let s9 = await state();
    if (!(s9.speed < 0.5)) fail(`car did not stop when braking: ${s9.speed}`);
    if (s9.action !== 'Kliv ur') fail(`expected "Kliv ur" in the car, got ${s9.action}`);
    await page.keyboard.press('KeyE');
    await page.waitForTimeout(100);
    let s10 = await state();
    if (s10.vehicle) fail('could not get out of the car');
    if (shots) await page.screenshot({ path: path.join(shots, '5-out.png') });

    // Portrait phone: ask to turn the phone.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    const rotate = await page.evaluate(() => getComputedStyle(document.getElementById('rotate')).display);
    if (rotate === 'none') fail('portrait hint not shown');

    if (errors.length) fail('errors on the page:\n' + errors.join('\n'));
    if (!process.exitCode) console.log('OK: start, joystick, bike, car, brake, get out, portrait hint');
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
