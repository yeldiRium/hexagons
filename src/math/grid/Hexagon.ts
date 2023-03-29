interface Hexagon {
  q: number;
  r: number;
  s: number;
}

const createHexagon = function ({ q, r }: { q: number; r: number }): Hexagon {
  return {
    q,
    r,
    s: -q - r
  };
};

type Direction = 0 | 1 | 2 | 3 | 4 | 5;

const directions = [
  createHexagon({ q: 1, r: 0 }),
  createHexagon({ q: 1, r: -1 }),
  createHexagon({ q: 0, r: -1 }),
  createHexagon({ q: -1, r: 0 }),
  createHexagon({ q: -1, r: 1 }),
  createHexagon({ q: 0, r: 1 })
];
const direction = function (d: Direction): Hexagon {
  return directions[d];
};

const equal = function (a: Hexagon, b: Hexagon): boolean {
  return a.q === b.q && a.r === b.r;
};

const add = function (a: Hexagon, b: Hexagon): Hexagon {
  return createHexagon({
    q: a.q + b.q,
    r: a.r + b.r
  });
};

const subtract = function (a: Hexagon, b: Hexagon): Hexagon {
  return createHexagon({
    q: a.q - b.q,
    r: a.r - b.r
  });
};

const multiply = function (a: Hexagon, k: number): Hexagon {
  return createHexagon({
    q: a.q * k,
    r: a.r * k
  });
};

const length = function (a: Hexagon): number {
  return Math.floor((Math.abs(a.q) + Math.abs(a.r) + Math.abs(a.s)) / 2);
};

const distance = function (a: Hexagon, b: Hexagon): number {
  return length(subtract(a, b));
};

const neighbor = function (a: Hexagon, d: Direction): Hexagon {
  return add(a, direction(d));
};

export type {
  Hexagon
};

export {
  directions,
  createHexagon,
  add,
  subtract,
  multiply,
  length,
  distance,
  neighbor
};
