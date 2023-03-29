import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';
import { layout, orientation } from '../../../math/hexagonGrid';

interface HexagonLayout {
  hexagonLayout: {
    layout: layout.Layout;
  };
}

const createHexagonLayout = function ({ orientation: o, size }: {
  orientation: orientation.Orientation;
  size: vector2d.Vector2d;
}): HexagonLayout {
  const mLayout = layout.createLayout({
    orientation: o,
    size
  });

  return {
    hexagonLayout: {
      get layout (): layout.Layout {
        return mLayout;
      }
    }
  };
};

const entityHasHexagonLayout = function (entity: Entity<any>): entity is Entity<HexagonLayout> {
  return 'hexagonLayout' in entity.components;
};

export type {
  HexagonLayout
};
export {
  createHexagonLayout,
  entityHasHexagonLayout
};
