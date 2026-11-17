// Shared constants for the prototype. Units are metres, seconds and radians.

export const VERSION = '0.3.0';

// Fixed simulation step, so the game behaves the same on every device
// (and later on the host and the guest in co-op).
export const STEP = 1 / 60;

export const PERSON = {
  radius: 0.35,
  mass: 80,
  walkSpeed: 5.2,
  response: 12, // how fast the walker reaches the target speed (1/s)
  reach: 1.3, // how far from a vehicle the smart button offers to get in
};

export const VEHICLES = {
  bike: {
    class: 'bike',
    name: 'Cykel',
    label: { enter: 'Ta cykeln', exit: 'Kliv av' },
    length: 1.8,
    width: 0.6,
    mass: 90,
    circles: [{ o: -0.55, r: 0.32 }, { o: 0.55, r: 0.32 }],
    maxSpeed: 10,
    reverseSpeed: 1.5,
    accel: 5.5,
    brake: 12,
    coast: 1.2,
    drag: 0.05,
    grip: 10,
    turnRate: 3.4,
    turnRefSpeed: 2.5,
    minTurn: 0.45,
    steerGain: 2.4,
    grassFactor: 1, // bikes keep their speed in parks
    fallImpact: 4, // m/s into a wall and the rider falls off
  },
  // Three kinds of car (F-033). They share the same driving model; the
  // numbers decide how they feel.
  small: {
    class: 'car',
    name: 'Småbil',
    label: { enter: 'Kliv in', exit: 'Kliv ur' },
    length: 3.6,
    width: 1.7,
    mass: 950,
    circles: [{ o: -1.0, r: 0.85 }, { o: 0, r: 0.85 }, { o: 1.0, r: 0.85 }],
    maxSpeed: 19, // about 70 km/h
    reverseSpeed: 6,
    accel: 7,
    brake: 20,
    coast: 2.5,
    drag: 0.08,
    grip: 7,
    turnRate: 2.9,
    turnRefSpeed: 4,
    minTurn: 0,
    steerGain: 2.2,
    grassFactor: 0.5,
    fallImpact: Infinity,
    handbrake: { grip: 1.4, turnBoost: 2.0, decel: 4, redirect: 3 },
  },
  car: {
    class: 'car',
    name: 'Bil',
    label: { enter: 'Kliv in', exit: 'Kliv ur' },
    length: 4.4,
    width: 1.9,
    mass: 1300,
    circles: [{ o: -1.35, r: 0.95 }, { o: 0, r: 0.95 }, { o: 1.35, r: 0.95 }],
    maxSpeed: 25, // about 90 km/h
    reverseSpeed: 6,
    accel: 9,
    brake: 22,
    coast: 2.5,
    drag: 0.06,
    grip: 6,
    turnRate: 2.4,
    turnRefSpeed: 5,
    minTurn: 0,
    steerGain: 2.0,
    grassFactor: 0.5,
    fallImpact: Infinity,
    handbrake: { grip: 1.3, turnBoost: 2.0, decel: 4, redirect: 3 },
  },
  sport: {
    class: 'car',
    name: 'Sportbil',
    label: { enter: 'Kliv in', exit: 'Kliv ur' },
    length: 4.5,
    width: 1.95,
    mass: 1350,
    circles: [{ o: -1.4, r: 0.97 }, { o: 0, r: 0.97 }, { o: 1.4, r: 0.97 }],
    maxSpeed: 33.5, // about 120 km/h
    reverseSpeed: 7,
    accel: 14,
    brake: 26,
    coast: 2.5,
    drag: 0.05,
    grip: 6.5,
    turnRate: 2.5,
    turnRefSpeed: 5,
    minTurn: 0,
    steerGain: 2.0,
    grassFactor: 0.45,
    fallImpact: Infinity,
    handbrake: { grip: 1.2, turnBoost: 2.1, decel: 4, redirect: 3 },
  },
};

export const COLORS = {
  outside: 0x3a3b3d,
  sidewalk: 0xb9b7b2,
  curb: 0x8e8c88,
  road: 0x5d5f63,
  lane: 0xd9d9d6,
  grass: 0x8e9f87,
  path: 0xc4bfb3,
  water: 0x6f8ea6,
  waterEdge: 0x5b7891,
  bridgeRail: 0x45474b,
  roof: 0xa9a59e,
  roofInset: 0xb3afa8,
  wallLight: 0x8a8681,
  wallMid: 0x7a7672,
  wallDark: 0x67645f,
  treeCanopy: 0x6f8468,
  treeCanopyLight: 0x7f9478,
  player: 0xf0a43a,
  playerHead: 0xf6d2a2,
  shadow: 0x000000,
};

export const SPORT_COLORS = [0xd23c32, 0xe8b923, 0x2f6fd6, 0x1f1f22];
export const CAR_COLORS = [0x7f95b0, 0xb07f7f, 0x9fa77a, 0xd0cdc5, 0x55585e, 0xa58fb5, 0x7fb0a6];
export const BIKE_COLORS = [0xc0504a, 0x4a76c0, 0x3f9a6a, 0xd6b13c, 0x2f2f33];
