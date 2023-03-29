import * as float from '../float.js';

interface Vector2d {
  readonly x: number;
  readonly y: number;
}

const createVector2d = function ({ x, y }: { x: number; y: number }): Vector2d {
  return { x, y };
};

const add = function (a: Vector2d, b: Vector2d): Vector2d {
  return createVector2d({
    x: a.x + b.x,
    y: a.y + b.y
  });
};

const sub = function (a: Vector2d, b: Vector2d): Vector2d {
  return createVector2d({
    x: a.x - b.x,
    y: a.y - b.y
  });
};

const mul = function (a: Vector2d, n: number): Vector2d {
  return createVector2d({
    x: a.x * n,
    y: a.y * n
  });
};

const equal = (a: Vector2d, b: Vector2d): boolean =>
  float.equal(a.x, b.x) && float.equal(a.y, b.y);

const zero = createVector2d({ x: 0, y: 0 });

export type {
  Vector2d
};

export {
  add,
  createVector2d,
  equal,
  sub,
  mul,
  zero
};
