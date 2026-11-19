// Driving-model checks without a browser (F-033, F-034).
// Usage: node tests/driving.mjs

import { buildTestMap } from '../src/map.js';
import { createGame, step, wrapAngle } from '../src/sim.js';
import { STEP } from '../src/config.js';

let failed = 0;
const check = (ok, msg) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`);
  if (!ok) failed++;
};

// An empty field, so nothing gets in the way.
function field(type) {
  const map = buildTestMap(1);
  map.buildings = [];
  map.water = [];
  map.trees = [];
  map.spawns.cars = [{ x: 60, y: 200, heading: 0, type, color: 0 }];
  map.spawns.bikes = [];
  map.spawns.player = { x: 60, y: 198.4, heading: 0 };
  const game = createGame(map);
  const input = { stick: { x: 0, y: 0, m: 0 }, brake: false, action: true, consumeAction() { const a = this.action; this.action = false; return a; } };
  step(game, input, STEP); // get in
  return { game, input, car: game.player.vehicle };
}

function run(ctx, seconds, stick, brake = false) {
  ctx.input.stick = stick;
  ctx.input.brake = brake;
  for (let t = 0; t < seconds; t += STEP) step(ctx.game, ctx.input, STEP);
}
const speed = (v) => Math.hypot(v.vx, v.vy);
// Up is forward (F-040): y = -1 is full throttle, x steers.
const ahead = { x: 0, y: -1, m: 1 };
const aheadRight = { x: 1, y: -1, m: 1.4 };
const back = { x: 0, y: 1, m: 1 };

// Top speed and acceleration per type.
const results = {};
for (const type of ['small', 'car', 'sport']) {
  const ctx = field(type);
  check(ctx.car && ctx.car.type === type, `got into the ${type}`);
  run(ctx, 1.5, ahead);
  const at3 = speed(ctx.car);
  run(ctx, 14, ahead);
  results[type] = { at3, top: speed(ctx.car) };
  console.log(`     ${type}: ${(at3 * 3.6).toFixed(0)} km/h after 1.5 s, top ${(results[type].top * 3.6).toFixed(0)} km/h`);
}
check(results.small.top < results.car.top && results.car.top < results.sport.top, 'small < car < sport in top speed');
check(results.car.top * 3.6 > 85 && results.car.top * 3.6 < 95, 'ordinary car about 90 km/h');
check(results.sport.top * 3.6 > 112 && results.sport.top * 3.6 < 125, 'sports car about 120 km/h');
check(results.sport.at3 > results.car.at3 * 1.2, 'sports car pulls away faster');

// A 90-degree corner from 70 km/h: with and without the handbrake.
function corner(handbrake) {
  const ctx = field('car');
  run(ctx, 10, ahead);
  ctx.car.vx = 19.5; // 70 km/h, straight east
  ctx.car.vy = 0;
  ctx.car.heading = 0;
  const x0 = ctx.car.x;
  let t = 0;
  ctx.input.stick = aheadRight;
  ctx.input.brake = handbrake;
  let slid = false;
  // Like a player: hold the brake through the turn, let go when lined up,
  // and count until the car is really heading south.
  while (t < 5) {
    const h = wrapAngle(ctx.car.heading);
    const dir = Math.atan2(ctx.car.vy, ctx.car.vx);
    if (h > Math.PI / 2 - 0.25) ctx.input.brake = false;
    if (h > Math.PI / 2 - 0.1 && dir > Math.PI / 2 - 0.25) break;
    step(ctx.game, ctx.input, STEP);
    slid ||= ctx.car.handbrake;
    t += STEP;
  }
  return { t, overshoot: ctx.car.x - x0, speed: speed(ctx.car), slid };
}
const plain = corner(false);
const hb = corner(true);
console.log(`     plain: ${plain.t.toFixed(2)} s, ${plain.overshoot.toFixed(1)} m wide, ${(plain.speed * 3.6).toFixed(0)} km/h out`);
console.log(`     handbrake: ${hb.t.toFixed(2)} s, ${hb.overshoot.toFixed(1)} m wide, ${(hb.speed * 3.6).toFixed(0)} km/h out`);
check(hb.slid, 'handbrake makes the rear let go');
check(hb.t < plain.t * 0.85, 'handbrake turns the car round quicker');
check(hb.overshoot < plain.overshoot * 0.8, 'handbrake takes the corner tighter');
check(hb.speed > 8, 'handbrake keeps some speed (not a full stop)');

// Braking straight is still a normal stop.
{
  const ctx = field('car');
  run(ctx, 4, ahead);
  run(ctx, 2, ahead, true);
  check(speed(ctx.car) < 0.5, 'brake while going straight stops the car');
}

// Pulling down brakes, then reverses; steering right turns clockwise.
{
  const ctx = field('car');
  run(ctx, 3, ahead);
  const before = speed(ctx.car);
  run(ctx, 0.8, back);
  check(speed(ctx.car) < before - 5, 'pulling down brakes');
  run(ctx, 3, back);
  const fx = Math.cos(ctx.car.heading);
  const vF = ctx.car.vx * fx + ctx.car.vy * Math.sin(ctx.car.heading);
  check(vF < -2, 'keeping it down reverses');
  const ctx2 = field('car');
  run(ctx2, 1, ahead);
  run(ctx2, 1, { x: 1, y: -1, m: 1.4 });
  check(ctx2.car.heading > 0.3, 'stick right turns the car to the right');
  const ctx3 = field('car');
  run(ctx3, 1, { x: 1, y: 0, m: 1 });
  check(speed(ctx3.car) < 0.1, 'only sideways does not move a standing car');
}

// B-054: touch steering by screen direction. The vehicle goes where the
// stick points on the screen (x right, y down = map directions).
{
  const dir = (a) => ({ x: Math.cos(a), y: Math.sin(a), m: 1 });
  const moving = (v) => Math.atan2(v.vy, v.vx);
  const off = (a, b) => Math.abs(wrapAngle(a - b));
  const vF = (v) => v.vx * Math.cos(v.heading) + v.vy * Math.sin(v.heading);
  const screen = (type = 'car') => {
    const ctx = field(type);
    ctx.input.steer = 'screen';
    return ctx;
  };
  // Pointing the stick right, down, left and up from a stop, facing east.
  for (const [name, a] of [['right', 0], ['down', Math.PI / 2], ['left', Math.PI], ['up', -Math.PI / 2]])
    for (const type of ['car', 'bike']) {
      const ctx = screen('car');
      if (type === 'bike') {
        // Swap the car for a bike in the same place.
        ctx.car.spec = { ...ctx.car.spec, ...(await import('../src/config.js')).VEHICLES.bike };
      }
      run(ctx, 5, dir(a));
      const v = ctx.car;
      check(speed(v) > 3 && off(moving(v), a) < 0.35, `${type}: stick ${name} from a stop goes ${name} (${(off(moving(v), a) * 57).toFixed(0)}° off, ${(speed(v) * 3.6).toFixed(0)} km/h${vF(v) < 0 ? ', backing' : ''})`);
      if (type === 'bike' && name === 'left') check(vF(v) > 0, 'bike: pulling straight back from a stop turns round (no backing)');
    }
  // Further means more throttle.
  {
    const a = screen();
    run(a, 1.5, { x: 0.35, y: 0, m: 0.35 });
    const b = screen();
    run(b, 1.5, dir(0));
    check(speed(b.car) > speed(a.car) * 1.5, 'a longer pull gives more gas');
  }
  // U-turn at speed: sweep the stick from right through down to left.
  {
    const ctx = screen();
    run(ctx, 3, dir(0));
    let minSpeed = Infinity;
    for (let k = 0; k <= 30; k++) {
      run(ctx, 0.05, dir((k / 30) * Math.PI));
      minSpeed = Math.min(minSpeed, speed(ctx.car));
    }
    run(ctx, 3, dir(Math.PI));
    check(off(moving(ctx.car), Math.PI) < 0.35 && vF(ctx.car) > 3, 'U-turn: sweeping the stick round turns the car round, driving forward');
    check(minSpeed > 3, 'U-turn keeps moving (does not stop to back up)');
  }
  // Straight back at speed: brake first, then back up that way.
  {
    const ctx = screen();
    run(ctx, 3, dir(0));
    const before = speed(ctx.car);
    run(ctx, 0.6, dir(Math.PI));
    check(speed(ctx.car) < before - 4 && vF(ctx.car) >= 0, 'pulling back at speed brakes first');
    run(ctx, 4, dir(Math.PI));
    check(ctx.car.vx < -2 && off(ctx.car.heading, 0) < 0.3, 'then it backs up the way you pull (nose still east)');
  }
  // From a stop, pulling straight back backs up; pulling back and to the side turns round.
  {
    const ctx = screen();
    run(ctx, 2, dir(Math.PI));
    check(ctx.car.vx < -1 && vF(ctx.car) < 0, 'from a stop, pulling straight back backs up');
    const c2 = screen();
    const a = (125 * Math.PI) / 180;
    run(c2, 6, dir(a));
    check(off(moving(c2.car), a) < 0.4 && vF(c2.car) > 2, 'from a stop, pulling back and to the side turns round and drives that way');
  }
  // While backing up, pulling forward again stops and drives forward.
  {
    const ctx = screen();
    run(ctx, 2.5, dir(Math.PI));
    run(ctx, 3, dir(0));
    check(ctx.car.vx > 2 && vF(ctx.car) > 0, 'after backing, pulling forward drives forward');
  }
  // Letting go rolls out softly.
  {
    const ctx = screen();
    run(ctx, 3, dir(0));
    const before = speed(ctx.car);
    run(ctx, 0.5, { x: 0, y: 0, m: 0 });
    check(speed(ctx.car) > before * 0.8, 'letting go does not stop dead');
    run(ctx, 12, { x: 0, y: 0, m: 0 });
    check(speed(ctx.car) < 0.3, 'letting go rolls out and stops');
  }
  // Brake button plus a pull to the side at speed: handbrake turn.
  {
    const ctx = screen();
    run(ctx, 4, dir(0));
    run(ctx, 0.3, dir(Math.PI / 2), true);
    check(ctx.car.handbrake, 'brake button plus a pull to the side at speed starts a handbrake turn');
    const c2 = screen();
    run(c2, 4, dir(0));
    run(c2, 2, dir(0), true);
    check(speed(c2.car) < 0.5, 'brake button stops the car');
  }
}

if (failed) {
  console.log(`${failed} failed`);
  process.exit(1);
}
console.log('OK: driving model');
