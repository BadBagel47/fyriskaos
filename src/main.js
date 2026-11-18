// Fyriskaos, prototype 1: walk, cycle and drive in a grey test map.

import { Application } from '../vendor/pixi/pixi.min.mjs';
import { STEP, VERSION } from './config.js';
import { buildTestMap } from './map.js';
import { createGame, step, actionLabel } from './sim.js';
import { createInput } from './input.js';
import { createRenderer } from './render.js';
import { createHud } from './hud.js';
import { CYCLE } from './daylight.js';

const $ = (id) => document.getElementById(id);

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

  const app = new Application();
  await app.init({
    resizeTo: window,
    background: 0x3a3b3d,
    antialias: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
  });
  $('game').appendChild(app.canvas);

  const map = buildTestMap(1);
  const game = createGame(map);
  // ?kvall in the address starts the round in the evening (for testing).
  if (new URLSearchParams(location.search).has('kvall')) game.clockOffset = 0.6 * CYCLE;
  const input = createInput(els);
  const hud = createHud(els);
  const renderer = createRenderer(app, game);

  let acc = 0;
  app.ticker.add((ticker) => {
    const dt = Math.min(ticker.deltaMS / 1000, 0.1);
    acc += dt;
    input.update();
    while (acc >= STEP) {
      step(game, input, STEP);
      acc -= STEP;
    }
    for (const ev of game.events.splice(0)) if (ev.type === 'toast') hud.toast(ev.text);
    renderer.frame(dt);
    hud.update(game, input.enabled ? actionLabel(game) : null, dt);
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

  // Read-only handle for the automatic tests.
  window.__fyriskaos = { game, input, renderer };
}

start().catch((err) => {
  console.error(err);
  $('error').hidden = false;
  $('error').textContent = 'Spelet kunde inte starta på den här enheten. Prova att ladda om sidan.';
});
