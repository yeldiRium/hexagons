interface Orientation {
  f0: number;
  f1: number;
  f2: number;
  f3: number;

  b0: number;
  b1: number;
  b2: number;
  b3: number;

  startAngle: number;
}

const pointyOrientation: Orientation = {
  f0: Math.sqrt(3),
  f1: Math.sqrt(3) / 2,
  f2: 0,
  f3: 3 / 2,
  b0: Math.sqrt(3) / 3,
  b1: -1 / 3,
  b2: 0,
  b3: 2 / 3,
  startAngle: 0.5
};

const flatOrientation: Orientation = {
  f0: 3 / 2,
  f1: 0,
  f2: Math.sqrt(3) / 2,
  f3: Math.sqrt(3),
  b0: 2 / 3,
  b1: 0,
  b2: -1 / 3,
  b3: Math.sqrt(3) / 3,
  startAngle: 0
};

export type {
  Orientation
};

export {
  pointyOrientation,
  flatOrientation
};
