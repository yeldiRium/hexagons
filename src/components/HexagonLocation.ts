import { Entity } from '../ecs/Entity.js';
import { hexagon } from '../grid';

interface HexagonLocation {
  hexagonLocation: {
    coordinates: hexagon.Hexagon;
  };
}

const createHexagonLocation = function (q: number, r: number): HexagonLocation {
  return {
    hexagonLocation: {
      coordinates: hexagon.createHexagon({ q, r })
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
