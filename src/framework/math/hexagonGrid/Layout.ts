import { Hexagon } from './Hexagon.js';
import { Orientation } from './Orientation.js';
import { vector2d } from '../physics2d';

interface Layout {
  orientation: Orientation;
  size: vector2d.Vector2d;
}

const createLayout = function ({ orientation, size }: {
  orientation: Orientation;
  size: vector2d.Vector2d;
}): Layout {
  return {
    orientation,
    size
  };
};

const coordinatesToScreen = function ({ layout, coordinates }: {
  layout: Layout;
  coordinates: Hexagon;
}): vector2d.Vector2d {
  return vector2d.createVector2d({
    x: ((layout.orientation.f0 * coordinates.q) + (layout.orientation.f1 * coordinates.r)) * layout.size.x,
    y: ((layout.orientation.f2 * coordinates.q) + (layout.orientation.f3 * coordinates.r)) * layout.size.y
  });
};

const hexagonCornerOffset = function ({ layout, corner }: {
  layout: Layout;
  corner: number;
}): vector2d.Vector2d {
  const angle = 2 * Math.PI * (layout.orientation.startAngle + corner) / 6;

  return vector2d.createVector2d({
    x: layout.size.x * Math.cos(angle),
    y: layout.size.y * Math.sin(angle)
  });
};

const hexagonCornerOffsets = function ({ layout }: {
  layout: Layout;
}): vector2d.Vector2d[] {
  const corners = [];

  for (let i = 0; i < 6; i++) {
    corners.push(hexagonCornerOffset({ layout, corner: i }));
  }

  return corners;
};

const hexagonCorners = function ({ layout, coordinates }: {
  layout: Layout;
  coordinates: Hexagon;
}): vector2d.Vector2d[] {
  const corners = [];

  const center = coordinatesToScreen({ layout, coordinates });

  for (const cornerOffset of hexagonCornerOffsets({ layout })) {
    corners.push(vector2d.createVector2d({
      x: center.x + cornerOffset.x,
      y: center.y + cornerOffset.y
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
  hexagonCornerOffsets,
  hexagonCorners
};
