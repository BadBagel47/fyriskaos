// Graphics gallery (F-004): the same things drawn in each style variant,
// rendered to images so they can sit side by side on any screen.

import { Application, Container, Graphics, RenderTexture } from '../vendor/pixi/pixi.min.mjs';
import { STYLES } from '../src/art/styles.js';
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

function street(style) {
  const root = new Container();
  const cam = { x: 15, y: 13 };
  const r = A.rng(17);
  const ground = new Graphics();
  // Same widths as the game: two 6 m lanes, 3 m sidewalks, plus a bike lane.
  A.drawSidewalk(ground, style, 0, 0, 30, 9.5);
  A.drawBikeLane(ground, style, 0, 9.5, 30, 1.6);
  A.drawRoad(ground, style, 0, 11.25, 30, 12, r);
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
  A.drawLamp(top, style, 5.5, 9.1, 1, cam);
  A.drawLamp(top, style, 19.8, 9.1, 1, cam);
  const hg = new Graphics();
  const d2 = (b) => (b.x + b.w / 2 - cam.x) ** 2 + (b.y + b.h / 2 - cam.y) ** 2;
  for (const b of [...list].sort((a, b) => d2(b) - d2(a))) A.drawHouse(hg, style, b, cam);
  root.addChild(hg);
  root.addChild(top);
  return { root, w: 30, h: 26.5 };
}

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

async function main() {
  document.getElementById('version').textContent = `v${VERSION}`;
  const app = new Application();
  await app.init({ width: 16, height: 16, antialias: true, preference: 'webgl', backgroundAlpha: 0 });
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (const sc of SCENES) {
    const row = document.createElement('section');
    row.className = 'row';
    row.id = sc.id;
    row.innerHTML = `<h2>${sc.title}</h2><p class="small">${sc.text}</p>`;
    const cols = document.createElement('div');
    cols.className = 'cols';
    for (const style of STYLES) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.style = style.id;
      const img = document.createElement('img');
      img.alt = `${sc.title}, ${style.name}`;
      img.src = await render(app, sc.make(style));
      cell.innerHTML = `<h3>${style.name}</h3><p>${style.summary}</p>`;
      cell.appendChild(img);
      cols.appendChild(cell);
    }
    row.appendChild(cols);
    grid.appendChild(row);
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
