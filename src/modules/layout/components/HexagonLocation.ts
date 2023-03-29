import { Entity } from '../../../ecs/Entity.js';
import { hexagon } from '../../../math/hexagonGrid';

interface HexagonLocation {
  hexagonLocation: {
    hexagon: hexagon.Hexagon;
  };
}

const createHexagonLocation = function ({ hexagon: initialHexagon }: {
  hexagon: hexagon.Hexagon;
}): HexagonLocation {
  let mHexagon = initialHexagon;

  return {
    hexagonLocation: {
      get hexagon (): hexagon.Hexagon {
        return mHexagon;
      },
      set hexagon (coordinates: hexagon.Hexagon) {
        mHexagon = coordinates;
      }
    }
  };
};

const entityHasHexagonLocation = function (entity: Entity<any>): entity is Entity<HexagonLocation> {
  return 'hexagonLocation' in entity.components;
};

export type {
  HexagonLocation
};
export {
  createHexagonLocation,
  entityHasHexagonLocation
};
