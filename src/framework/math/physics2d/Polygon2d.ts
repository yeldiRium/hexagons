import * as line2d from './Line2d.js';
import * as rect2d from './Rect2d.js';
import * as vector2d from './Vector2d.js';

interface Polygon2d {
  points: vector2d.Vector2d[];
}

const createPolygon2d = function ({ points }: {
  points: vector2d.Vector2d[];
}): Polygon2d {
  return {
    points
  };
};

const translate = function ({ polygon, vector }: {
  polygon: Polygon2d;
  vector: vector2d.Vector2d;
}): Polygon2d {
  return createPolygon2d({
    points: polygon.points.map(point => vector2d.add(point, vector))
  });
};

const toLines = function ({ polygon }: {
  polygon: Polygon2d;
}): line2d.Line2d[] {
  return polygon.points.map((point, index, points): line2d.Line2d =>
    line2d.createLine2d({
      start: point,
      end: points[(index + 1) % points.length]
    }));
};

const getBoundingRect = function ({ polygon }: {
  polygon: Polygon2d;
}): rect2d.Rect2d {
  const xs = polygon.points.map(point => point.x);
  const ys = polygon.points.map(point => point.y);

  const topMost = Math.min(...ys);
  const bottomMost = Math.max(...ys);
  const leftMost = Math.min(...xs);
  const rightMost = Math.max(...xs);

  return rect2d.createRect2d({
    topLeft: vector2d.createVector2d({ x: leftMost, y: topMost }),
    bottomRight: vector2d.createVector2d({ x: rightMost, y: bottomMost })
  });
};

const containsVector = function ({ polygon, vector }: {
  polygon: Polygon2d;
  vector: vector2d.Vector2d;
}): boolean {
  const boundingRect = getBoundingRect({ polygon });

  if (!rect2d.containsVector({ rect: boundingRect, vector })) {
    return false;
  }

  // https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
  const polygonEdges = toLines({ polygon });
  const ray = line2d.createLine2d({
    start: vector2d.createVector2d({ x: -1, y: vector.y }),
    end: vector
  });

  const intersections = polygonEdges.
    filter(polygonEdge => line2d.intersect({ a: polygonEdge, b: ray })).
    length;

  // If the number of intersections is odd, the vector lies inside the polygon.
  const isContained = intersections % 2 === 1;

  return isContained;
};

export type {
  Polygon2d
};
export {
  createPolygon2d,
  containsVector,
  getBoundingRect,
  toLines,
  translate
};
