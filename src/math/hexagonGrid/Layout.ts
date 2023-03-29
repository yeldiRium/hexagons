import { Hexagon } from './Hexagon.js';
import { Orientation } from './Orientation.js';
import { vector } from '..';

interface Layout {
  orientation: Orientation;
  size: vector.Vector;
}

const createLayout = function ({ orientation, size }: {
  orientation: Orientation;
  size: vector.Vector;
}): Layout {
  return {
    orientation,
    size
  };
};

const coordinatesToScreen = function ({ layout, coordinates }: {
  layout: Layout;
  coordinates: Hexagon;
}): vector.Vector {
  return vector.createVector({
    x: ((layout.orientation.f0 * coordinates.q) + (layout.orientation.f1 * coordinates.r)) * layout.size.x,
    y: ((layout.orientation.f2 * coordinates.q) + (layout.orientation.f3 * coordinates.r)) * layout.size.y
  });
};

const hexagonCornerOffset = function ({ layout, corner }: {
  layout: Layout;
  corner: number;
}): vector.Vector {
  const angle = 2 * Math.PI * (layout.orientation.startAngle + corner) / 6;

  return vector.createVector({
    x: layout.size.x * Math.cos(angle),
    y: layout.size.y * Math.sin(angle)
  });
};

const hexagonCornerOffsets = function ({ layout }: {
  layout: Layout;
}): vector.Vector[] {
  const corners = [];

  for (let i = 0; i < 6; i++) {
    corners.push(hexagonCornerOffset({ layout, corner: i }));
  }

  return corners;
};

const hexagonCorners = function ({ layout, coordinates }: {
  layout: Layout;
  coordinates: Hexagon;
}): vector.Vector[] {
  const corners = [];

  const center = coordinatesToScreen({ layout, coordinates });

  for (const cornerOffset of hexagonCornerOffsets({ layout })) {
    corners.push(vector.createVector({
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
