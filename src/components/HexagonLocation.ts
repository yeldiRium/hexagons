import { Entity } from '../ecs/Entity.js';
import { hexagon } from '../grid';

interface HexagonLocation {
  hexagonLocation: {
    coordinates: hexagon.Hexagon;
  };
}

const createHexagonLocation = function (q: number, r: number): HexagonLocation {
  let mCoordinates = hexagon.createHexagon({ q, r });

  return {
    hexagonLocation: {
      get coordinates (): hexagon.Hexagon {
        return mCoordinates;
      },
      set coordinates (coordinates: hexagon.Hexagon) {
        mCoordinates = coordinates;
      }
    }
  };
};

const entityHasHexagonLocationComponent = function (entity: Entity<any>): entity is Entity<HexagonLocation> {
  return 'hexagonLocation' in entity.components;
};

export type {
  HexagonLocation
};
export {
  createHexagonLocation,
  entityHasHexagonLocationComponent
};
