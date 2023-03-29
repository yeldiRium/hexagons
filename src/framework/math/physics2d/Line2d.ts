import * as vector2d from './Vector2d.js';

interface Line2d {
  start: vector2d.Vector2d;
  end: vector2d.Vector2d;
}

const createLine2d = function ({ start, end }: {
  start: vector2d.Vector2d;
  end: vector2d.Vector2d;
}): Line2d {
  return { start, end };
};

const intersect = function ({ a, b }: {
  a: Line2d;
  b: Line2d;
}): boolean {
  const t = (
    ((a.start.x - b.start.x) * (b.start.y - b.end.y)) -
    ((a.start.y - b.start.y) * (b.start.x - b.end.x))
  ) / (
    ((a.start.x - a.end.x) * (b.start.y - b.end.y)) -
    ((a.start.y - a.end.y) * (b.start.x - b.end.x))
  );

  const u = (
    ((a.start.x - b.start.x) * (a.start.y - a.end.y)) -
    ((a.start.y - b.start.y) * (a.start.x - a.end.x))
  ) / (
    ((a.start.x - a.end.x) * (b.start.y - b.end.y)) -
    ((a.start.y - a.end.y) * (b.start.x - b.end.x))
  );

  return (0 <= t && t <= 1) &&
    (0 <= u && u <= 1);
};

export type {
  Line2d
};
export {
  createLine2d,
  intersect
};
