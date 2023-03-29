import { Entity } from '../../../ecs/Entity.js';
import { polygon2d } from '../../../math/physics2d';

interface Polygon {
  polygon: {
    polygon: polygon2d.Polygon2d;
  };
}

const createPolygon = function ({ polygon: initialPolygon }: {
  polygon: polygon2d.Polygon2d;
}): Polygon {
  let mPolygon = initialPolygon;

  return {
    polygon: {
      get polygon (): polygon2d.Polygon2d {
        return mPolygon;
      },
      set polygon (newPolygon: polygon2d.Polygon2d) {
        mPolygon = newPolygon;
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
