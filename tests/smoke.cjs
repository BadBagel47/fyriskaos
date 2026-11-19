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
    // Wait until the game has drawn a few more frames (robust on slow machines).
    const frames = async (n = 3) => {
      const f0 = await page.evaluate(() => window.__fyriskaos.perf.frames);
      await page.waitForFunction((f) => window.__fyriskaos.perf.frames >= f, f0 + n, { timeout: 60000 });
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
    await frames();
    let s2 = await state();
    if (s2.action !== 'Ta cykeln') fail(`not next to the bike after walking back (${s2.action})`);
    await page.keyboard.press('KeyE');
    await frames();
    let s3 = await state();
    if (s3.vehicle !== 'bike') fail('could not take the bike');
    if (!s3.brakeVisible) fail('brake button hidden on the bike');

    // Ride along the sidewalk.
    await holdUntilSpeed('ArrowUp', 5, 30000);
    let s4 = await state();
    if (!(s4.speed > 3)) fail(`bike too slow: ${s4.speed}`);
    if (shots) await page.screenshot({ path: path.join(shots, '3-bike.png') });
    // Brake for 1.2 s of game time (slow machines draw fewer frames per second).
    await page.keyboard.down('Space');
    const tBrake = await page.evaluate(() => window.__fyriskaos.game.time);
    await page.waitForFunction((t0) => window.__fyriskaos.game.time - t0 > 1.2, tBrake, { timeout: 60000 });
    await page.keyboard.up('Space');
    let s5 = await state();
    if (s5.vehicle === 'bike' && s5.speed > 0.5) fail(`bike did not stop when braking: ${s5.speed}`);
    if (s5.vehicle === 'bike') await page.keyboard.press('KeyE');
    const tOff = await page.evaluate(() => window.__fyriskaos.game.time);
    await page.waitForFunction((t0) => window.__fyriskaos.game.time - t0 > 1.5, tOff, { timeout: 60000 });

    // Put the player next to the start car and drive it.
    await page.evaluate(() => {
      const g = window.__fyriskaos.game;
      const car = g.vehicles.find((v) => v.type === 'car' && Math.abs(v.x - 211) < 1 && Math.abs(v.y - 255.7) < 1);
      g.player.x = car.x;
      g.player.y = car.y - 1.6;
      g.player.vx = g.player.vy = 0;
      g.player.stun = 0;
    });
    await frames();
    let s6 = await state();
    if (s6.action !== 'Kliv in') fail(`expected "Kliv in" next to the car, got ${s6.action}`);
    await page.keyboard.press('KeyE');
    await frames();
    let s7 = await state();
    if (s7.vehicle !== 'car') fail('could not get in the car');
    await holdUntilSpeed('ArrowUp', 14, 30000);
    let s8 = await state();
    if (!(s8.speed > 14)) fail(`car did not reach 50 km/h: ${s8.speed}`);
    if (!(s8.x < s7.x - 6)) fail('car did not drive left (west)');
    if (shots) await page.screenshot({ path: path.join(shots, '4-car.png') });
    // Turn by pointing the stick down: the car should turn towards it.
    // Stick up and to the right: the car turns right while driving on.
    const h0 = await page.evaluate(() => window.__fyriskaos.game.player.vehicle.heading);
    await page.keyboard.down('ArrowUp');
    await page.keyboard.down('ArrowRight');
    const tTurn = await page.evaluate(() => window.__fyriskaos.game.time);
    await page.waitForFunction((t0) => window.__fyriskaos.game.time - t0 > 0.8, tTurn, { timeout: 30000 });
    await page.keyboard.up('ArrowRight');
    await page.keyboard.up('ArrowUp');
    const heading = await page.evaluate(() => window.__fyriskaos.game.player.vehicle.heading);
    const turned = Math.atan2(Math.sin(heading - h0), Math.cos(heading - h0));
    if (!(turned > 0.5)) fail(`car did not turn right (${turned})`);
    await page.keyboard.down('Space');
    await page.waitForFunction(() => {
      const v = window.__fyriskaos.game.player.vehicle;
      return Math.hypot(v.vx, v.vy) < 0.5;
    }, null, { timeout: 30000 }).catch(() => {});
    await page.keyboard.up('Space');
    let s9 = await state();
    if (!(s9.speed < 0.5)) fail(`car did not stop when braking: ${s9.speed}`);
    if (s9.action !== 'Kliv ur') fail(`expected "Kliv ur" in the car, got ${s9.action}`);
    await page.keyboard.press('KeyE');
    await frames();
    let s10 = await state();
    if (s10.vehicle) fail('could not get out of the car');
    if (shots) await page.screenshot({ path: path.join(shots, '5-out.png') });

    // The sports car across the street: name in the corner, then a handbrake slide.
    await page.evaluate(() => {
      const g = window.__fyriskaos.game;
      const car = g.vehicles.find((v) => v.type === 'sport');
      Object.assign(g.player, { x: car.x - 3, y: car.y + 1.7, vx: 0, vy: 0, stun: 0 });
    });
    await frames();
    await page.keyboard.press('KeyE');
    await frames();
    const sportName = await page.textContent('#speed');
    if (!/^Sportbil/.test(sportName)) fail(`expected the sports car, got "${sportName}"`);
    await holdUntilSpeed('ArrowUp', 16, 30000);
    const before = await page.evaluate(() => window.__fyriskaos.game.player.vehicle.heading);
    await page.keyboard.down('Space');
    await page.keyboard.down('ArrowLeft');
    const tSlide = await page.evaluate(() => window.__fyriskaos.game.time);
    await page.waitForFunction((t0) => window.__fyriskaos.game.time - t0 > 0.45, tSlide, { timeout: 30000 });
    const slide = await page.evaluate(() => {
      const v = window.__fyriskaos.game.player.vehicle;
      return { handbrake: v.handbrake, heading: v.heading, speed: Math.hypot(v.vx, v.vy) };
    });
    if (shots) await page.screenshot({ path: path.join(shots, '6-handbrake.png') });
    await page.keyboard.up('Space');
    await page.keyboard.up('ArrowLeft');
    if (!(before - slide.heading > 0.6)) fail(`handbrake did not swing the car round (${before} -> ${slide.heading})`);
    if (!(slide.speed > 5)) fail(`handbrake stopped the car dead (${slide.speed})`);

    // B-054: touch steering by screen direction (the default). Real touch
    // events on the joystick; obstacles and other vehicles are moved out of
    // the way, so only the steering is tested.
    await page.keyboard.up('ArrowLeft');
    await page.keyboard.up('Space');
    const cdpTouch = await context.newCDPSession(page);
    const touch = (type, x, y) => cdpTouch.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, id: 1 }] });
    const gameWait = async (sec) => {
      const t0 = await page.evaluate(() => window.__fyriskaos.game.time);
      await page.waitForFunction(([t, d]) => window.__fyriskaos.game.time - t > d, [t0, sec], { timeout: 120000 });
    };
    const X0 = 200;
    const Y0 = 250;
    const dragTo = async (dx, dy) => {
      await touch('touchStart', X0, Y0);
      for (let k = 1; k <= 6; k++) await touch('touchMove', X0 + (dx * k) / 6, Y0 + (dy * k) / 6);
    };
    const place = (heading, speed) =>
      page.evaluate(([h, sp]) => {
        const g = window.__fyriskaos.game;
        for (const c of g.grid.cells) {
          c.rects.length = 0;
          c.circles.length = 0;
        }
        const v = g.player.vehicle;
        for (const o of g.vehicles) if (o !== v) Object.assign(o, { x: -500 - Math.random() * 100, y: -500, vx: 0, vy: 0 });
        Object.assign(v, { x: 280, y: 200, heading: h, vx: Math.cos(h) * sp, vy: Math.sin(h) * sp, handbrake: false, reversing: false, grip: v.spec.grip });
      }, [heading, speed]);
    const motion = () =>
      page.evaluate(() => {
        const v = window.__fyriskaos.game.player.vehicle;
        return { dir: Math.atan2(v.vy, v.vx), speed: Math.hypot(v.vx, v.vy), vF: v.vx * Math.cos(v.heading) + v.vy * Math.sin(v.heading), heading: v.heading, vx: v.vx };
      });
    const off = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
    if (!(await page.evaluate(() => window.__fyriskaos.game.player.vehicle))) fail('touch test: not in a car');
    // Four screen directions, each from a stop facing a quarter turn away.
    // Within the stick's 60 px, so its centre stays put.
    for (const [name, a, dx, dy] of [['right', 0, 55, 0], ['down', Math.PI / 2, 0, 55], ['left', Math.PI, -55, 0], ['up', -Math.PI / 2, 0, -55]]) {
      await place(a - Math.PI / 2, 0);
      await dragTo(dx, dy);
      await gameWait(3);
      const m = await motion();
      await touch('touchEnd');
      if (!(m.speed > 3 && off(m.dir, a) < 0.4 && m.vF > 0)) fail(`touch: dragging ${name} did not drive ${name} (${(off(m.dir, a) * 57).toFixed(0)}° off, ${m.speed.toFixed(1)} m/s)`);
    }
    // U-turn at speed: sweep the finger from right, through down, to left.
    await place(0, 12);
    await dragTo(55, 0);
    for (let k = 1; k <= 24; k++) {
      const a = (k / 24) * Math.PI;
      await touch('touchMove', X0 + 55 * Math.cos(a), Y0 + 55 * Math.sin(a));
      await gameWait(0.06);
    }
    await gameWait(2.5);
    const u = await motion();
    await touch('touchEnd');
    if (!(off(u.dir, Math.PI) < 0.4 && u.vF > 2)) fail(`touch: U-turn did not end driving left (${(off(u.dir, Math.PI) * 57).toFixed(0)}° off, forward ${u.vF.toFixed(1)} m/s)`);
    // Dragging straight back at speed: brake first, then back up that way.
    await place(0, 20);
    // Record the forward speed every frame, then check the order: slowing
    // down first (still facing east), backing up after.
    await page.evaluate(() => {
      const log = (window.__vF = []);
      const tick = () => {
        const v = window.__fyriskaos.game.player.vehicle;
        if (!v || log.length > 4000) return;
        log.push(v.vx * Math.cos(v.heading) + v.vy * Math.sin(v.heading));
        requestAnimationFrame(tick);
      };
      tick();
    });
    await dragTo(-55, 0);
    await gameWait(4);
    const b2 = await motion();
    await touch('touchEnd');
    const vFs = await page.evaluate(() => window.__vF.splice(0));
    const firstBack = vFs.findIndex((x) => x < -0.3);
    const slowed = vFs.slice(0, firstBack < 0 ? vFs.length : firstBack).some((x) => x > 0.5 && x < 17);
    if (!(firstBack > 0 && slowed)) fail(`touch: dragging back at speed did not brake first (${vFs.slice(0, 8).map((x) => x.toFixed(1)).join(' ')})`);
    if (!(b2.vx < -1.5 && off(b2.heading, 0) < 0.3)) fail(`touch: dragging back did not back up that way (vx ${b2.vx.toFixed(1)})`);
    // Letting go rolls out softly.
    await place(0, 10);
    await gameWait(0.4);
    const r1 = await motion();
    if (!(r1.speed > 7)) fail(`touch: letting go stopped the car too hard (${r1.speed.toFixed(1)} m/s)`);
    if (shots) await page.screenshot({ path: path.join(shots, '7-touch.png') });

    // Portrait phone: ask to turn the phone.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    const rotate = await page.evaluate(() => getComputedStyle(document.getElementById('rotate')).display);
    if (rotate === 'none') fail('portrait hint not shown');

    // The graphics gallery draws all variants without errors (F-004).
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto(`http://127.0.0.1:${port}/gallery/`);
    await page.waitForFunction(() => document.body.dataset.ready || document.getElementById('grid').textContent.includes('kunde inte'), null, { timeout: 180000 });
    const pics = await page.$$eval('.cell img', (l) => l.filter((i) => i.naturalWidth > 100).length);
    if (pics !== 26) fail(`gallery drew ${pics} of 26 pictures`);

    // The 3D style test (D-043): starts, shows the fps meter, the style button works.
    await page.goto(`http://127.0.0.1:${port}/stiltest.html?q=low`);
    await page.waitForFunction(() => window.__stiltest && window.__stiltest.firstFrameMs, null, { timeout: 120000 });
    const v0 = await page.evaluate(() => window.__stiltest.variant);
    await page.click('#btn-variant');
    await page.waitForTimeout(500);
    const v1 = await page.evaluate(() => window.__stiltest.variant);
    if (v0 === v1) fail('style button did not change the variant');
    await page.waitForFunction(() => /fps/.test(document.getElementById('fps').textContent) && !/…/.test(document.getElementById('fps').textContent), null, { timeout: 30000 });

    // B-053: when the browser drops the 3D graphics, drawing stops and a Swedish
    // message says so (game and style test).
    const glMessage = () => page.evaluate(() => {
      const el = document.getElementById('gl-fail');
      return el && !el.hidden && getComputedStyle(el).display !== 'none' ? el.textContent : null;
    });
    const loseContext = (canvasSel) => page.evaluate((sel) => {
      const gl = document.querySelector(sel).getContext('webgl2');
      gl.getExtension('WEBGL_lose_context').loseContext();
    }, canvasSel);
    const stillDrawing = async (count) => {
      const a = await page.evaluate(count);
      await page.waitForTimeout(1500);
      return (await page.evaluate(count)) !== a;
    };
    await page.goto(`http://127.0.0.1:${port}/index.html?fps`);
    await page.waitForFunction(() => window.__fyriskaos && window.__fyriskaos.perf.frames > 2, null, { timeout: 120000 });
    await page.click('#btn-start');
    await loseContext('#game canvas');
    await page.waitForFunction(() => document.getElementById('gl-fail'), null, { timeout: 10000 }).catch(() => {});
    const gameMsg = await glMessage();
    if (!gameMsg || !/slutade fungera/.test(gameMsg) || !/Chrome/.test(gameMsg)) fail(`game: no message after losing the 3D context (${gameMsg})`);
    if (await stillDrawing(() => window.__fyriskaos.perf.frames)) fail('game: still drawing after losing the 3D context');
    if (!(await page.evaluate(() => document.getElementById('fps').hidden))) fail('game: fps meter still shown after losing the 3D context');
    await page.goto(`http://127.0.0.1:${port}/stiltest.html?q=low`);
    await page.waitForFunction(() => window.__stiltest && window.__stiltest.firstFrameMs, null, { timeout: 120000 });
    await loseContext('#view canvas');
    await page.waitForFunction(() => document.getElementById('gl-fail'), null, { timeout: 10000 }).catch(() => {});
    const styleMsg = await glMessage();
    if (!styleMsg || !/slutade fungera/.test(styleMsg)) fail(`style test: no message after losing the 3D context (${styleMsg})`);
    if (await stillDrawing(() => window.__stiltest.cpu.length + window.__stiltest.samples.length)) fail('style test: still drawing after losing the 3D context');

    if (errors.length) fail('errors on the page:\n' + errors.join('\n'));

    // No WebGL at all: both pages say so instead of failing silently.
    const noGl = await context.newPage();
    await noGl.addInitScript(() => {
      const orig = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        return /webgl/.test(type) ? null : orig.call(this, type, ...rest);
      };
    });
    for (const url of ['index.html', 'stiltest.html']) {
      await noGl.goto(`http://127.0.0.1:${port}/${url}`);
      const msg = await noGl.waitForFunction(() => document.getElementById('gl-fail')?.textContent, null, { timeout: 30000 }).then((h) => h.jsonValue()).catch(() => null);
      if (!msg || !/kunde inte starta/.test(msg)) fail(`${url}: no message when WebGL cannot start (${msg})`);
    }
    await noGl.close();
    if (!process.exitCode) console.log('OK: start, joystick, bike, car, brake, get out, sports car, handbrake, portrait hint, gallery, style test, lost 3D context, no WebGL, touch steering by screen direction');
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
