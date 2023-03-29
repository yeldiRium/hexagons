import { Entity } from '../../../ecs/Entity.js';
import { vector } from '../../../math';
import { layout, orientation } from '../../../math/hexagonGrid';

interface HexagonGrid {
  hexagonGrid: {
    layout: layout.Layout;
  };
}

const createHexagonGrid = function ({ orientation: o, size, origin }: {
  orientation: orientation.Orientation;
  size: vector.Vector;
  origin: vector.Vector;
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
