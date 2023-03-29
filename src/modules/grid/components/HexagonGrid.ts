import { Entity } from '../../../ecs/Entity.js';
import { point } from '../../../math';
import { layout, orientation } from '../../../math/grid';

interface HexagonGrid {
  hexagonGrid: {
    layout: layout.Layout;
  };
}

const createHexagonGrid = function ({ o, size, origin }: {
  o: orientation.Orientation;
  size: point.Point;
  origin: point.Point;
}): HexagonGrid {
  const mLayout = layout.createLayout({
    orientation: o,
    size,
    origin
  });

  return {
    hexagonGrid: {
      get layout (): layout.Layout {
        return mLayout;
      }
    }
  };
};

const entityHasHexagonGrid = function (entity: Entity<any>): entity is Entity<HexagonGrid> {
  return 'hexagonGrid' in entity.components;
};

export type {
  HexagonGrid
};
export {
  createHexagonGrid,
  entityHasHexagonGrid
};
