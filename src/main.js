// Fyriskaos: walk, cycle and drive in a test city, drawn in 3D (F-042).

import { STEP, VERSION } from './config.js';
import { loadCityMap } from './citymap.js';
import { createPlay } from './play.js';
import { createGame, step, actionLabel } from './sim.js';
import { createInput } from './input.js';
import { createHud } from './hud.js';
import { CYCLE } from './daylight.js';
import { createRenderer3d, QUALITY } from './game3d/view.js';
import { GL_NONE, showGlMessage, watchContext, webglAvailable } from './glcheck.js';

const $ = (id) => document.getElementById(id);
// Start-up times for the performance test (ms since the page began).
const mark = (n) => (globalThis.__marks ||= []).push([n, Math.round(performance.now())]);
mark('module');

async function start() {
  const els = {
    surface: $('hud'),
    joy: $('joy'),
    knob: $('joy-knob'),
    action: $('btn-action'),
    brake: $('btn-brake'),
    speed: $('speed'),
    toast: $('toast'),
  };
  for (const el of document.querySelectorAll('[data-version]')) el.textContent = `v${VERSION}`;

  const map = await loadCityMap(new URL('data/map/centrum.json', document.baseURI).href);
  const game = createGame(map);
  // The game layer adds the police cars, so it comes before the renderer.
  const play = createPlay(game);
  // ?kvall in the address starts the round in the evening (for testing).
  const params = new URLSearchParams(location.search);
  if (params.has('kvall')) game.clockOffset = 0.6 * CYCLE;
  const input = createInput(els);
  const hud = createHud(els);
  mark('game');
  if (!webglAvailable()) {
    showGlMessage(GL_NONE);
    return;
  }
  const renderer = await createRenderer3d($('game'), game);
  // B-053: if the browser drops the 3D graphics, stop drawing and say so.
  let glLost = false;
  watchContext(renderer.renderer.domElement, () => {
    glLost = true;
    $('fps').hidden = true;
    if (window.__fyriskaos) window.__fyriskaos.glLost = true;
  });
  mark('city');

  // ---------- settings: graphics quality and the fps meter ----------
  const settings = { quality: params.get('q') || 'auto', fps: params.has('fps'), steer: params.get('styrning') === 'klassisk' ? 'classic' : 'screen' };
  input.touchSteer = settings.steer;
  const fpsEl = $('fps');
  const showSettings = () => {
    $('set-fps').textContent = settings.fps ? 'Visa fps: på' : 'Visa fps: av';
    $('set-quality').textContent = `Grafik: ${settings.quality === 'auto' ? `auto (${QUALITY[renderer.quality].name})` : QUALITY[settings.quality].name}`;
    $('set-steer').textContent = settings.steer === 'screen' ? 'Styrning: åt hållet du drar' : 'Styrning: klassisk';
    fpsEl.hidden = !settings.fps;
  };
  $('btn-settings').addEventListener('click', () => {
    $('settings').hidden = !$('settings').hidden;
    showSettings();
  });
  $('set-close').addEventListener('click', () => ($('settings').hidden = true));
  $('set-fps').addEventListener('click', () => {
    settings.fps = !settings.fps;
    showSettings();
  });
  // B-054: touch steering for bikes and cars, by screen direction or classic.
  $('set-steer').addEventListener('click', () => {
    settings.steer = settings.steer === 'screen' ? 'classic' : 'screen';
    input.touchSteer = settings.steer;
    showSettings();
  });
  $('set-quality').addEventListener('click', () => {
    const order = ['auto', 'low', 'medium', 'high'];
    settings.quality = order[(order.indexOf(settings.quality) + 1) % order.length];
    if (settings.quality !== 'auto') renderer.setQuality(settings.quality);
    showSettings();
  });
  if (settings.quality !== 'auto' && QUALITY[settings.quality]) renderer.setQuality(settings.quality);
  showSettings();

  // ---------- the game layer on screen ----------
  $('set-credits').addEventListener('click', () => ($('credits').hidden = false));
  $('credits-close').addEventListener('click', () => ($('credits').hidden = true));
  let hudKey = '';
  function hudPlay(st) {
    const m = st.mission;
    const tgt = st.target;
    const d = tgt ? Math.round(Math.hypot(tgt.x - game.player.x, tgt.y - game.player.y)) : 0;
    let title = '';
    let info = '';
    if (m && m.step === 'pickup') {
      title = 'Nattmackorna';
      info = `Hämta mackorna på Mackbaren · ${d} m`;
    } else if (m && m.step === 'deliver') {
      title = `Nattmackorna · ${Math.max(0, Math.ceil(m.time))} s`;
      info = `${m.sandwiches} mackor till ${m.label} · ${d} m`;
    }
    const key = [st.money, st.stars, Math.round(st.health / 5), title, info, st.phone && st.phone.text, st.ticket > 0].join('|');
    if (key === hudKey) return;
    hudKey = key;
    $('money').textContent = `${st.money} kr`;
    $('stars').textContent = st.stars ? '★'.repeat(st.stars) + '☆'.repeat(3 - st.stars) : '';
    $('health').firstChild.style.width = `${Math.max(0, st.health)}%`;
    $('mission').hidden = !title;
    $('mission-title').textContent = title;
    $('mission-info').textContent = info;
    $('phone').hidden = !st.phone;
    if (st.phone) {
      $('phone-from').textContent = `SMS från ${st.phone.from}`;
      $('phone-text').textContent = st.phone.text;
    }
    $('ticket').hidden = !(st.ticket > 0);
  }

  // ---------- main loop ----------
  // cpu: milliseconds of game work (simulation and drawing) per frame, for
  // the performance tests (F-042).
  const perf = { cpu: [], build: [], frames: 0 };
  let acc = 0;
  let last = performance.now();
  let fpsFrames = 0;
  let fpsTime = 0;
  let slowFor = 0;
  let fastFor = 0;
  let lastDrop = -99;
  let clock = 0;
  function loop(now) {
    if (glLost) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const t0 = performance.now();
    acc += dt;
    input.update();
    while (acc >= STEP) {
      step(game, input, STEP);
      const evs = game.events.splice(0);
      if (input.enabled) play.step(STEP, evs);
      for (const ev of evs) if (ev.type === 'toast') hud.toast(ev.text);
      acc -= STEP;
    }
    hudPlay(play.state);
    renderer.frame(dt);
    hud.update(game, input.enabled ? actionLabel(game) : null, dt);
    perf.cpu.push(performance.now() - t0);
    perf.build.push(renderer.buildMs || 0);
    if (perf.cpu.length > 1200) {
      perf.cpu.shift();
      perf.build.shift();
    }
    perf.frames++;

    // Fps meter, and automatic quality: down a step below 50 fps for a
    // second, up again after 8 s at 59 or more (not within 20 s of a drop).
    clock += dt;
    fpsFrames++;
    fpsTime += dt;
    if (fpsTime >= 0.5) {
      const fps = fpsFrames / fpsTime;
      fpsFrames = 0;
      fpsTime = 0;
      if (settings.fps) fpsEl.textContent = `${Math.round(fps)} fps · ${QUALITY[renderer.quality].name}`;
      if (settings.quality === 'auto' && clock > 3) {
        const order = ['low', 'medium', 'high'];
        const i = order.indexOf(renderer.quality);
        slowFor = fps < 50 ? slowFor + 0.5 : 0;
        fastFor = fps >= 59 ? fastFor + 0.5 : 0;
        if (slowFor >= 1 && i > 0) {
          renderer.setQuality(order[i - 1]);
          slowFor = 0;
          lastDrop = clock;
          if (!$('settings').hidden) showSettings();
        } else if (fastFor >= 8 && i < 2 && clock - lastDrop > 20) {
          renderer.setQuality(order[i + 1]);
          fastFor = 0;
          if (!$('settings').hidden) showSettings();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame((now) => {
    last = now;
    const tf = performance.now();
    loop(now);
    (globalThis.__times ||= []).push(['firstFrame', Math.round(performance.now() - tf)]);
    mark('firstFrame');
    // CC0 models and full-size pictures after the first frame.
    setTimeout(() => {
      renderer.upgradeModels().then(() => (window.__fyriskaos.modelsReady = true));
      renderer.upgradeTextures();
    }, 200);
  });

  $('btn-start').addEventListener('click', () => {
    $('start').hidden = true;
    input.enabled = true;
    const root = document.documentElement;
    if (matchMedia('(pointer: coarse)').matches && root.requestFullscreen) {
      root
        .requestFullscreen({ navigationUI: 'hide' })
        .then(() => screen.orientation?.lock?.('landscape'))
        .catch(() => {});
    }
  });
  $('btn-start').disabled = false;

  // Read-only handle for the automatic tests.
  window.__fyriskaos = { game, input, renderer, perf, play };
}

start().catch((err) => {
  console.error(err);
  $('error').hidden = false;
  $('error').textContent = 'Spelet kunde inte starta på den här enheten. Prova att ladda om sidan.';
});
