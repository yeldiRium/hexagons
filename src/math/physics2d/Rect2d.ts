import * as vector2d from './Vector2d.js';

interface Rect2d {
  topLeft: vector2d.Vector2d;
  bottomRight: vector2d.Vector2d;
}

const createRect2d = function ({ topLeft, bottomRight }: {
  topLeft: vector2d.Vector2d;
  bottomRight: vector2d.Vector2d;
}): Rect2d {
  return { topLeft, bottomRight };
};

const containsVector = function ({ rect, vector }: {
  rect: Rect2d;
  vector: vector2d.Vector2d;
}): boolean {
  const isLeft = vector.x < rect.topLeft.x;
  const isRight = vector.x > rect.bottomRight.x;
  const isAbove = vector.y < rect.topLeft.y;
  const isBelow = vector.y > rect.bottomRight.y;

  const isOutside = isLeft || isRight || isAbove || isBelow;

  return !isOutside;
};

export type {
  Rect2d
};
export {
  createRect2d,
  containsVector
};
