import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { hexagon } from '../../../math/hexagonGrid';

interface HexagonLocation {
  layout: {
    hexagonLocation: {
      hexagon: hexagon.Hexagon;
    };
  };
}

const createHexagonLocation = function ({ hexagon: initialHexagon }: {
  hexagon: hexagon.Hexagon;
}): HexagonLocation {
  let mHexagon = initialHexagon;

  return {
    layout: {
      hexagonLocation: {
        get hexagon (): hexagon.Hexagon {
          return mHexagon;
        },
        set hexagon (coordinates: hexagon.Hexagon) {
          mHexagon = coordinates;
        }
      }
    }
  };
};

const entityHasHexagonLocation = function (entity: Entity<any>): entity is Entity<HexagonLocation> {
  return has(entity.components, 'layout.hexagonLocation');
};

export type {
  HexagonLocation
};
export {
  createHexagonLocation,
  entityHasHexagonLocation
};
