interface Vector {
  x: number;
  y: number;
}

const createVector = function ({ x, y }: { x: number; y: number }): Vector {
  return { x, y };
};

const equal = (a: Vector, b: Vector): boolean => a.x === b.x && a.y === b.y;

export type {
  Vector
};

export {
  createVector,
  equal
};
