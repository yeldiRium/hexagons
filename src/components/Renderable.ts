import { Entity } from '../engine/Entity.js';
import { point } from '../rendering';

interface Renderable {
  renderable: {
    polygons: point.Point[][];
  };
}

const createRenderable = function (polygons: point.Point[][]): Renderable {
  return {
    renderable: {
      polygons
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
