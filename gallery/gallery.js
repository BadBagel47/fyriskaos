// Graphics gallery (F-004): the same things drawn in each style variant,
// rendered to images so they can sit side by side on any screen.

import { Application, Container, Graphics, RenderTexture } from '../vendor/pixi/pixi.min.mjs';
import { STYLES, PLUS_STYLE } from '../src/art/styles.js';
import * as Dt from '../src/art/detail.js';
import { createLightLayer } from '../src/art/light.js';
import { explosion, scorch, muzzleFlash } from '../src/art/fx.js';
import { streetTest, loadDetailAssets, assetUrls } from './detail-test.js';
import { render3D } from './three-scene.js';
import * as A from '../src/art/draw.js';
import { VERSION } from '../src/config.js';

const PPM = 24; // px per metre, about what a phone shows in the game
const U = A.U;

function at(g, x, y, rot, fn) {
  const c = new Container();
  const gg = new Graphics();
  A.rotated(rot, () => fn(gg));
  c.addChild(gg);
  c.position.set(x * U, y * U);
  c.rotation = rot;
  g.addChild(c);
}

// ---------- scenes ----------

function vehicles(style) {
  const root = new Container();
  const ground = new Graphics();
  A.drawRoad(ground, style, 0, 0, 24, 5.6, A.rng(3), { patch: false });
  A.drawLaneDashes(ground, style, 0, 2.8, 24);
  A.drawCurb(ground, style, 0, 5.6, 24);
  A.drawSidewalk(ground, style, 0, 5.75, 24, 4);
  root.addChild(ground);
  at(root, 2.6, 1.5, 0, (g) => A.drawCar(g, style, 'small', 0x7fb0a6));
  at(root, 8.0, 1.5, 0, (g) => A.drawCar(g, style, 'car', 0x7f95b0));
  at(root, 13.6, 1.5, 0, (g) => A.drawCar(g, style, 'sport', 0xd23c32));
  at(root, 19.6, 3.4, -0.45, (g) => A.drawCar(g, style, 'car', 0xd0cdc5));
  at(root, 2.0, 7.8, 0, (g) => A.drawBike(g, style, 0x4a76c0));
  at(root, 5.0, 7.8, -0.3, (g) => {
    A.drawBike(g, style, 0xc0504a);
    A.drawPerson(g, style, { shirt: 0x3f9a6a, hair: 0x2b2b2b });
  });
  at(root, 8.6, 7.6, 0.4, (g) => A.drawPerson(g, style, { shirt: 0x6a5acd, hair: 0xd9b26a }));
  at(root, 10.4, 8.3, 2.6, (g) => A.drawPerson(g, style, { shirt: 0xd0cdc5, hair: 0x7a4a2a, skin: 0xb07a4f }));
  at(root, 13.2, 7.8, 0, (g) => A.drawPerson(g, style, { shirt: 0xf0a43a, ring: true }));
  const furniture = new Graphics();
  A.drawBikeRack(furniture, style, 16.5, 7.8, 4);
  A.drawBin(furniture, style, 22.6, 6.6);
  root.addChild(furniture);
  at(root, 16.5, 7.8, Math.PI / 2, (g) => A.drawBike(g, style, 0x3f9a6a));
  at(root, 17.3, 7.8, Math.PI / 2, (g) => A.drawBike(g, style, 0xd6b13c));
  at(root, 18.9, 7.8, -Math.PI / 2, (g) => A.drawBike(g, style, 0x2f2f33));
  return { root, w: 24, h: 9.75 };
}

function houses(style) {
  const root = new Container();
  const cam = { x: 20, y: 14 };
  const ground = new Graphics();
  A.drawSidewalk(ground, style, 0, 0, 40, 27);
  ground.rect(16 * U, 10.5 * U, 8 * U, 6 * U).fill(style.ground.grass);
  root.addChild(ground);
  const list = [
    { x: 2, y: 1.5, w: 13, h: 8, height: 12, roof: 'gable', facade: style.facades[0], roofColor: style.roofs[0], seed: 0.11 },
    { x: 25, y: 1, w: 13, h: 8.5, height: 18, roof: 'flat', facade: style.facades[3], roofColor: 0x9a978f, seed: 0.42 },
    { x: 4, y: 18, w: 11, h: 7.5, height: 9, roof: 'gable', facade: style.facades[4], roofColor: style.roofs[1], seed: 0.73 },
    { x: 26, y: 18, w: 11, h: 7.5, height: 15, roof: 'flat', facade: style.facades[1], roofColor: 0x8e8b84, seed: 0.29 },
  ];
  const shadows = new Graphics();
  for (const b of list) A.drawHouseShadow(shadows, style, b);
  root.addChild(shadows);
  const tree = new Graphics();
  A.drawTree(tree, style, 20, 13.5, 2.4, 5);
  root.addChild(tree);
  const hg = new Graphics();
  const d2 = (b) => (b.x + b.w / 2 - cam.x) ** 2 + (b.y + b.h / 2 - cam.y) ** 2;
  for (const b of [...list].sort((a, b) => d2(b) - d2(a))) A.drawHouse(hg, style, b, cam);
  root.addChild(hg);
  at(root, 19, 17.6, 0.2, (g) => A.drawPerson(g, style, { shirt: 0xf0a43a, ring: true }));
  return { root, w: 40, h: 27 };
}

function street(baseStyle, { evening = false } = {}) {
  // At night the sun's shadows fade; light comes from lamps and windows instead.
  const style = evening ? { ...baseStyle, shadow: { ...baseStyle.shadow, alpha: baseStyle.shadow.alpha * 0.3 } } : baseStyle;
  const root = new Container();
  const cam = { x: 15, y: 13 };
  const r = A.rng(17);
  const ground = new Graphics();
  // Same widths as the game: two 6 m lanes, 3 m sidewalks, plus a bike lane.
  A.drawSidewalk(ground, style, 0, 0, 30, 9.5);
  A.drawBikeLane(ground, style, 0, 9.5, 30, 1.6);
  A.drawRoad(ground, style, 0, 11.25, 30, 12, r, { lanes: [14.25, 20.25] });
  A.drawCurb(ground, style, 0, 11.2, 30);
  A.drawLaneDashes(ground, style, 0, 17.25, 20);
  A.drawCrosswalk(ground, style, 21, 11.3, 12);
  A.drawCurb(ground, style, 0, 23.25, 30);
  A.drawSidewalk(ground, style, 0, 23.4, 30, 3.1);
  A.drawManhole(ground, style, 10.5, 15.2);
  A.drawDrain(ground, style, 12, 11.55);
  A.drawDrain(ground, style, 27, 11.55);
  A.drawDrain(ground, style, 6, 22.95);
  root.addChild(ground);
  const list = [
    { x: 0.5, y: -4, w: 9.5, h: 8.5, height: 14, roof: 'gable', facade: style.facades[0], roofColor: style.roofs[0], seed: 0.21 },
    { x: 10.5, y: -4, w: 9, h: 8.5, height: 17, roof: 'flat', facade: style.facades[3], roofColor: 0x9a978f, seed: 0.62 },
    { x: 20, y: -4, w: 9.5, h: 8.5, height: 11, roof: 'gable', facade: style.facades[2], roofColor: style.roofs[3], seed: 0.83 },
  ];
  const sh = new Graphics();
  for (const b of list) A.drawHouseShadow(sh, style, b);
  root.addChild(sh);
  const furn = new Graphics();
  A.drawBench(furn, style, 7, 6.2);
  A.drawBin(furn, style, 9.2, 6.2);
  A.drawBikeRack(furn, style, 12.5, 7.4, 4);
  A.drawSign(furn, style, 19, 8.9, 'parking');
  A.drawSign(furn, style, 24.5, 8.9, 'bus');
  A.drawPlanter(furn, style, 1.2, 5.6, 3.2, 1.4, 4);
  A.drawPlanter(furn, style, 13, 24.3, 3, 1.3, 8);
  A.drawBin(furn, style, 17.4, 24.9);
  root.addChild(furn);
  at(root, 12.5, 7.4, Math.PI / 2, (g) => A.drawBike(g, style, 0xc0504a));
  at(root, 13.3, 7.4, Math.PI / 2, (g) => A.drawBike(g, style, 0x4a76c0));
  at(root, 14.9, 7.4, Math.PI / 2, (g) => A.drawBike(g, style, 0x2f2f33));
  at(root, 5.5, 14.3, Math.PI, (g) => A.drawCar(g, style, 'car', 0x7f95b0));
  at(root, 14, 20.2, 0, (g) => A.drawCar(g, style, 'small', 0xd0cdc5));
  at(root, 9, 10.3, 0, (g) => {
    A.drawBike(g, style, 0x3f9a6a);
    A.drawPerson(g, style, { shirt: 0xd6b13c, hair: 0x2b2b2b });
  });
  at(root, 17, 6.4, Math.PI, (g) => A.drawPerson(g, style, { shirt: 0x6a5acd, hair: 0xd9b26a }));
  at(root, 4, 25, 0, (g) => A.drawPerson(g, style, { shirt: 0x3f9a6a, hair: 0x7a4a2a, skin: 0xb07a4f }));
  at(root, 4.9, 25.3, 0, (g) => A.drawPerson(g, style, { shirt: 0xc0504a, hair: 0x2b2b2b }));
  at(root, 4.5, 7.7, 0.3, (g) => A.drawPerson(g, style, { shirt: 0xf0a43a, ring: true }));
  const top = new Graphics();
  A.drawTree(top, style, 27.5, 6.3, 2.3, 9);
  A.drawTree(top, style, 25, 25, 1.8, 3);
  const lampHeads = [A.drawLamp(top, style, 5.5, 8.6, 1, cam), A.drawLamp(top, style, 19.8, 8.6, 1, cam)];
  const hg = new Graphics();
  const d2 = (b) => (b.x + b.w / 2 - cam.x) ** 2 + (b.y + b.h / 2 - cam.y) ** 2;
  // In the evening more windows are lit, in a warm colour.
  const hs = evening && style.detail ? { ...style, windowLit: 0xffcf7a, litChance: 0.5 } : style;
  for (const b of [...list].sort((a, b) => d2(b) - d2(a))) A.drawHouse(hg, hs, b, cam);
  root.addChild(hg);
  root.addChild(top);
  if (evening) {
    const L = createLightLayer(30, 26.5, 0.58);
    root.addChild(L.root);
    // The player's ring stays bright at night, so you always find yourself.
    const ring = new Graphics().circle(4.5 * U, 7.7 * U, 0.75 * U).stroke({ width: 2.5, color: 0xffffff, alpha: 0.85 });
    root.addChild(ring);
    if (style.detail) {
      // Street lamps (the heads lean like in drawLamp), lit windows, the moving car's headlights and the cyclist's lamp.
      // Warm pools of light under each lamp head.
      for (const [hx, hy] of lampHeads) {
        L.glow(hx, hy, 8, 0xffb35a, 0.6);
        L.glow(hx, hy, 3, 0xffd89a, 0.45);
        L.glow(hx, hy, 0.7, 0xffffff, 0.5);
      }
      L.cone(15.75, 19.65, -0.04, 10, 0xffe2a8, 0.32);
      L.cone(15.75, 20.75, 0.04, 10, 0xffe2a8, 0.32);
      L.glow(12.2, 19.7, 0.8, 0xff3020, 0.7);
      L.glow(12.2, 20.7, 0.8, 0xff3020, 0.7);
      L.cone(9.9, 10.3, 0, 5, 0xfff6d8, 0.45);
      L.glow(24.5, 8.4, 1.4, 0xfff0a0, 0.4);
      for (const wx of [2, 5, 8, 12, 15, 18, 22, 25, 28]) L.glow(wx, 4.6, 1.3, 0xffb050, 0.25);
    }
  }
  return { root, w: 30, h: 26.5 };
}

function park(style) {
  const root = new Container();
  const g = new Graphics();
  const W = 30;
  const H = 20;
  if (style.detail) {
    Dt.grassTexture(g, style, 0, 0, W, H, 21);
    Dt.gravelPath(g, style, 0, 8.5, W, 2.6, 22);
    Dt.gravelPath(g, style, 13.5, 0, 2.6, H, 23);
  } else {
    g.rect(0, 0, W * U, H * U).fill(style.ground.grass);
    g.rect(0, 8.5 * U, W * U, 2.6 * U).fill(style.ground.sidewalk);
    g.rect(13.5 * U, 0, 2.6 * U, H * U).fill(style.ground.sidewalk);
  }
  // A small pond.
  g.ellipse(23.5 * U, 15.5 * U, 4.6 * U, 2.8 * U).fill(0x5b7891);
  g.ellipse(23.5 * U, 15.5 * U, 4.2 * U, 2.4 * U).fill(0x6f8ea6);
  if (style.detail) {
    const r = A.rng(31);
    for (let i = 0; i < 40; i++) g.ellipse((20 + r() * 7) * U, (14 + r() * 3) * U, 0.25 * U, 0.06 * U).fill({ color: 0xffffff, alpha: 0.15 });
    for (let i = 0; i < 6; i++) g.circle((21 + r() * 5) * U, (14.5 + r() * 2) * U, 0.35 * U).fill(0x5f8f4e);
  }
  root.addChild(g);
  const v = new Graphics();
  if (style.detail) {
    Dt.hedge(v, style, 0.5, 0.5, 11, 1.6, 41);
    Dt.hedge(v, style, 17, 0.5, 12.5, 1.6, 42);
    for (const [x, y, rr, sd, fl] of [[3, 13.5, 1.1, 51, 0xd96a9a], [6, 15.8, 0.9, 52, 0xf2d24c], [9.5, 13.2, 1.0, 53, 0xffffff], [18.5, 4.5, 1.0, 54, 0xd96a9a]]) Dt.shrub(v, style, x, y, rr, sd, fl);
  } else {
    for (const [x, y, w, h] of [[0.5, 0.5, 11, 1.6], [17, 0.5, 12.5, 1.6]]) {
      v.roundRect(x * U, y * U, w * U, h * U, 0.4 * U).fill(style.tree[0]);
      if (style.outline.width) v.stroke({ width: style.outline.width, color: style.outline.color, alpha: style.outline.alpha });
    }
    for (const [x, y, rr] of [[3, 13.5, 1.1], [6, 15.8, 0.9], [9.5, 13.2, 1.0], [18.5, 4.5, 1.0]]) {
      v.circle(x * U, y * U, rr * U).fill(style.tree[1]);
      if (style.outline.width) v.stroke({ width: style.outline.width, color: style.outline.color, alpha: style.outline.alpha });
    }
  }
  A.drawBench(v, style, 10, 7.6);
  A.drawBin(v, style, 12, 7.6);
  root.addChild(v);
  at(root, 7, 9.6, 0.1, (gg) => A.drawPerson(gg, style, { shirt: 0x6a5acd, hair: 0xd9b26a }));
  at(root, 14.8, 4, 1.6, (gg) => A.drawPerson(gg, style, { shirt: 0xf0a43a, ring: true }));
  at(root, 21, 9.8, 0, (gg) => {
    A.drawBike(gg, style, 0x4a76c0);
    A.drawPerson(gg, style, { shirt: 0x3f9a6a, hair: 0x2b2b2b });
  });
  const t = new Graphics();
  if (style.detail) {
    Dt.detailedTree(t, style, 6, 4.8, 3.0, 61);
    Dt.detailedTree(t, style, 24, 5.2, 2.6, 62);
    Dt.detailedTree(t, style, 9.5, 17, 2.4, 63);
  } else {
    A.drawTree(t, style, 6, 4.8, 3.0, 61);
    A.drawTree(t, style, 24, 5.2, 2.6, 62);
    A.drawTree(t, style, 9.5, 17, 2.4, 63);
  }
  root.addChild(t);
  return { root, w: W, h: H };
}

function blast(style) {
  const root = new Container();
  const g = new Graphics();
  const r = A.rng(71);
  const W = 52;
  A.drawRoad(g, style, 0, 0, W, 11, r, { patch: false, lanes: [5.5] });
  A.drawLaneDashes(g, style, 0, 5.5, W);
  root.addChild(g);
  const L = createLightLayer(W, 11, 0);
  const fx = new Graphics();
  for (let i = 0; i < 3; i++) {
    const cx = 6.5 + i * 13;
    const cy = 5.5;
    if (i > 0) scorch(g, cx, cy, 3.2, 80 + i);
    at(root, cx, cy, -0.3, (gg) => A.drawCar(gg, style, 'car', i === 0 ? 0x7f95b0 : 0x3a3a3e, { burnt: i === 2 }));
    explosion(fx, cx + 0.6, cy - 0.2, i, 90 + i, L);
  }
  // Fourth panel: a muzzle flash.
  at(root, 42, 7.5, -0.35, (gg) => A.drawPerson(gg, style, { shirt: 0xf0a43a, ring: true }));
  muzzleFlash(fx, 42 + Math.cos(-0.35) * 0.45, 7.5 + Math.sin(-0.35) * 0.45 + 0.2, -0.35, 5, L);
  root.addChild(fx);
  root.addChild(L.root);
  return { root, w: W, h: 11 };
}

const COMPARE = [
  { id: 'jmf-gata', title: 'Gata på dagen', text: 'Samma gata som nedan. Förslaget har kornig asfalt, stenkanter, varierade plattor, träd av lövklungor och lite kraftigare kontur på folk och fordon.', make: (st) => street(st) },
  { id: 'jmf-kvall', title: 'Gata på kvällen', text: 'Variant 1 blir bara mörkare. Förslaget har gatlyktor som lyser upp marken, fönster som lyser, strålkastare och cykellampa.', make: (st) => street(st, { evening: true }) },
  { id: 'jmf-park', title: 'Park och grönska', text: 'Gräs, grusgångar, häckar, buskar med blommor, träd och en damm.', make: (st) => park(st) },
];

const SCENES = [
  { id: 'gata', title: 'Gata med allt ihop', text: 'Hus, trottoar, cykelbana, väg och gatumöbler tillsammans. Viktigast att bedöma.', make: street },
  { id: 'fordon', title: 'Fordon och folk', text: 'Småbil, vanlig bil, sportbil, cyklar, fotgängare och spelaren (med ring).', make: vehicles },
  { id: 'hus', title: 'Hus', text: 'Sadeltak och platta tak. Husen lutar bort från mitten av skärmen så att man ser väggarna.', make: houses },
];

async function render(app, scene) {
  const { root, w, h } = scene;
  const holder = new Container();
  holder.addChild(root);
  holder.scale.set(PPM / U);
  const mask = new Graphics().rect(0, 0, w * PPM, h * PPM).fill(0xffffff);
  holder.mask = mask;
  const wrap = new Container();
  wrap.addChild(holder, mask);
  const rt = RenderTexture.create({ width: Math.round(w * PPM), height: Math.round(h * PPM), resolution: 2, antialias: true });
  app.renderer.render({ container: wrap, target: rt, clear: true, clearColor: 0x2b2c2e });
  const url = await app.renderer.extract.base64({ target: rt, format: 'png' });
  rt.destroy(true);
  wrap.destroy({ children: true });
  return url;
}

function row(title, text, id, cls) {
  const sec = document.createElement('section');
  sec.className = 'row';
  sec.id = id;
  sec.innerHTML = `<h2>${title}</h2><p class="small">${text}</p>`;
  const cols = document.createElement('div');
  cols.className = `cols ${cls}`;
  sec.appendChild(cols);
  return { sec, cols };
}

async function cell(app, cols, style, scene, title) {
  const c = document.createElement('div');
  c.className = 'cell';
  c.dataset.style = style.id;
  const img = document.createElement('img');
  img.alt = title;
  img.src = await render(app, scene);
  c.innerHTML = `<h3>${style.name}</h3><p>${style.summary}</p>`;
  c.appendChild(img);
  cols.appendChild(c);
}

async function main() {
  document.getElementById('version').textContent = `v${VERSION}`;
  const app = new Application();
  await app.init({ width: 16, height: 16, antialias: true, preference: 'webgl', backgroundAlpha: 0 });
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  // D-041: detail test, the same street four ways (plus the current style).
  await loadDetailAssets();
  const h0 = document.createElement('h2');
  h0.className = 'part';
  h0.textContent = 'Detaljtest (D-041): samma gata på fyra sätt';
  grid.appendChild(h0);
  const ways = [
    { name: 'Nuvarande (Sommarkväll+)', summary: 'Det som finns i spelet nu: allt ritat med enkla former.', make: (ev) => streetTest(PLUS_STYLE, { evening: ev }) },
    { name: 'A – Genererade bilder', summary: 'Asfalt, plattor, tak, träd och bilar från bildgeneratorn; resten ritat som nu.', make: (ev) => streetTest(PLUS_STYLE, { evening: ev, tex: true }) },
    { name: 'B – Ljus och skuggor', summary: 'Ritat som nu, men med långa mjuka skuggor, mörkare vid husväggarna, mer kontrast, korn och mörka kanter.', make: (ev) => streetTest(PLUS_STYLE, { evening: ev, fx: true }) },
    { name: 'C – 3D', summary: 'Byggt i 3D: solen och lamporna räknas fram, med riktiga skuggor. Använder de genererade ytorna, trädet och bilen.', three: true },
    { name: 'A + B – Kombination', summary: 'Genererade bilder och ljus och skuggor tillsammans.', make: (ev) => streetTest(PLUS_STYLE, { evening: ev, tex: true, fx: true }) },
  ];
  for (const ev of [false, true]) {
    const { sec, cols } = row(ev ? 'Gata på kvällen' : 'Gata på dagen', ev ? 'Samma gata när det blivit kväll, med gatlyktor, fönster och strålkastare.' : 'Trädet och bilen som i bild 1; lådor, staket och tunnor som i bild 3.', ev ? 'd041-kvall' : 'd041-dag', 'two');
    grid.appendChild(sec);
    for (const w of ways) {
      const c = document.createElement('div');
      c.className = 'cell';
      const img = document.createElement('img');
      img.alt = `${w.name}, ${ev ? 'kväll' : 'dag'}`;
      img.src = w.three ? await render3D({ evening: ev, assets: assetUrls() }) : await render(app, w.make(ev));
      c.innerHTML = `<h3>${w.name}</h3><p>${w.summary}</p>`;
      c.appendChild(img);
      cols.appendChild(c);
    }
  }

  const h1 = document.createElement('h2');
  h1.className = 'part';
  h1.textContent = 'Nytt förslag jämfört med variant 1';
  grid.appendChild(h1);
  for (const sc of COMPARE) {
    const { sec, cols } = row(sc.title, sc.text, sc.id, 'two');
    grid.appendChild(sec);
    for (const style of [STYLES[0], PLUS_STYLE]) await cell(app, cols, style, sc.make(style), `${sc.title}, ${style.name}`);
  }
  {
    const { sec, cols } = row('Explosion', 'En bil som sprängs, i tre steg: blixten, eldklotet och vraket som brinner. Längst till höger: en mynningsflamma när spelaren skjuter.', 'jmf-explosion', 'one');
    grid.appendChild(sec);
    await cell(app, cols, PLUS_STYLE, blast(PLUS_STYLE), 'Explosion i tre steg');
  }

  const h2 = document.createElement('h2');
  h2.className = 'part';
  h2.textContent = 'De tre första varianterna';
  grid.appendChild(h2);
  for (const sc of SCENES) {
    const { sec, cols } = row(sc.title, sc.text, sc.id, 'three');
    grid.appendChild(sec);
    for (const style of STYLES) await cell(app, cols, style, sc.make(style), `${sc.title}, ${style.name}`);
  }

  const zoom = document.getElementById('zoom');
  grid.addEventListener('click', (e) => {
    if (e.target.tagName !== 'IMG') return;
    zoom.querySelector('img').src = e.target.src;
    zoom.hidden = false;
  });
  zoom.addEventListener('click', () => (zoom.hidden = true));
  document.body.dataset.ready = '1';
}

main().catch((e) => {
  console.error(e);
  document.getElementById('grid').textContent = 'Galleriet kunde inte ritas: ' + e.message;
});
