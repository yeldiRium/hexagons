interface Vector {
  readonly x: number;
  readonly y: number;
}

const createVector = function ({ x, y }: { x: number; y: number }): Vector {
  return { x, y };
};

const add = function (a: Vector, b: Vector): Vector {
  return createVector({
    x: a.x + b.x,
    y: a.y + b.y
  });
};

const equal = (a: Vector, b: Vector): boolean => a.x === b.x && a.y === b.y;

const zero = createVector({ x: 0, y: 0 });

export type {
  Vector
};

export {
  add,
  createVector,
  equal,
  zero
};
