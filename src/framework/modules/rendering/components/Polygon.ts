import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { polygon2d } from '../../../math/physics2d';

interface Polygon {
  rendering: {
    polygon: {
      polygon: polygon2d.Polygon2d;
    };
  };
}

const createPolygon = function ({ polygon: initialPolygon }: {
  polygon: polygon2d.Polygon2d;
}): Polygon {
  let mPolygon = initialPolygon;

  return {
    rendering: {
      polygon: {
        get polygon (): polygon2d.Polygon2d {
          return mPolygon;
        },
        set polygon (newPolygon: polygon2d.Polygon2d) {
          mPolygon = newPolygon;
        }
      }
    }
  };
};

const entityHasPolygon = function (entity: Entity<any>): entity is Entity<Polygon> {
  return has(entity.components, 'rendering.polygon');
};

export type {
  Polygon
};
export {
  createPolygon,
  entityHasPolygon
};
