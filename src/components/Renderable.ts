import { Entity } from '../ecs/Entity.js';
import { point } from '../rendering';

interface Renderable {
  renderable: {
    polygons: point.Point[][];
  };
}

const createRenderable = function (polygons: point.Point[][]): Renderable {
  let mPolygons = polygons;

  return {
    renderable: {
      get polygons (): point.Point[][] {
        return mPolygons;
      },
      set polygons (polygons: point.Point[][]) {
        mPolygons = polygons;
      }
    }
  };
};

const entityHasRenderableComponent = function (entity: Entity<any>): entity is Entity<Renderable> {
  return 'renderable' in entity.components;
};

export type {
  Renderable
};
export {
  createRenderable,
  entityHasRenderableComponent
};
