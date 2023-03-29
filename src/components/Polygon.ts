import { Entity } from '../ecs/Entity.js';
import { point } from '../rendering';

interface Polygon {
  polygon: {
    polygon: point.Point[];
  };
}

const createPolygon = function (polygon: point.Point[]): Polygon {
  let mPolygon = polygon;

  return {
    polygon: {
      get polygon (): point.Point[] {
        return mPolygon;
      },
      set polygon (polygon: point.Point[]) {
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
