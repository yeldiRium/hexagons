import { Entity } from '../../../ecs/Entity.js';
import { vector } from '../../../math';

interface Polygon {
  polygon: {
    polygon: vector.Vector[];
  };
}

const createPolygon = function (polygon: vector.Vector[]): Polygon {
  let mPolygon = polygon;

  return {
    polygon: {
      get polygon (): vector.Vector[] {
        return mPolygon;
      },
      set polygon (polygon: vector.Vector[]) {
        mPolygon = polygon;
      }
    }
  };
};

const entityHasPolygon = function (entity: Entity<any>): entity is Entity<Polygon> {
  return 'polygon' in entity.components;
};

export type {
  Polygon
};
export {
  createPolygon,
  entityHasPolygon
};
