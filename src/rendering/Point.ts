interface Point {
  x: number;
  y: number;
}

const createPoint = function ({ x, y }: { x: number; y: number }): Point {
  return { x, y };
};

export type {
  Point
};

export {
  createPoint
};
