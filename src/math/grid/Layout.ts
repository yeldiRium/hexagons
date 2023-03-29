import { Hexagon } from './Hexagon.js';
import { Orientation } from './Orientation.js';
import { point } from '..';

interface Layout {
  orientation: Orientation;
  size: point.Point;
  origin: point.Point;
}

const createLayout = function ({ orientation, size, origin }: {
  orientation: Orientation;
  size: point.Point;
  origin: point.Point;
}): Layout {
  return {
    orientation,
    size,
    origin
  };
};

const coordinatesToScreen = function ({ layout, coordinates }: {
  layout: Layout;
  coordinates: Hexagon;
}): point.Point {
  const x = ((layout.orientation.f0 * coordinates.q) + (layout.orientation.f1 * coordinates.r)) * layout.size.x;
  const y = ((layout.orientation.f2 * coordinates.q) + (layout.orientation.f3 * coordinates.r)) * layout.size.y;

  return point.createPoint({
    x: x + layout.origin.x,
    y: y + layout.origin.y
  });
};

const hexagonCornerOffset = function ({ layout, corner }: {
  layout: Layout;
  corner: number;
}): point.Point {
  const angle = 2 * Math.PI * (layout.orientation.startAngle + corner) / 6;

  return point.createPoint({
    x: layout.size.x * Math.cos(angle),
    y: layout.size.y * Math.sin(angle)
  });
};

const hexagonCorners = function ({ layout, coordinates }: {
  layout: Layout;
  coordinates: Hexagon;
}): point.Point[] {
  const corners = [];

  const center = coordinatesToScreen({ layout, coordinates });

  for (let i = 0; i < 6; i++) {
    const offset = hexagonCornerOffset({ layout, corner: i });

    corners.push(point.createPoint({
      x: center.x + offset.x,
      y: center.y + offset.y
    }));
  }

  return corners;
};

export type {
  Layout
};

export {
  createLayout,
  coordinatesToScreen,
  hexagonCornerOffset,
  hexagonCorners
};
