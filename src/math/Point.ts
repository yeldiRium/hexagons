interface Point {
  x: number;
  y: number;
}

const createPoint = function ({ x, y }: { x: number; y: number }): Point {
  return { x, y };
};

const equal = (a: Point, b: Point): boolean => a.x === b.x && a.y === b.y;

export type {
  Point
};

export {
  createPoint,
  equal
};
