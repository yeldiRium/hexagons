import { orientation } from '../grid';
import { point } from '../rendering';
import { Viewport } from '../components';
import { createEntity, Entity } from '../ecs/Entity.js';

type ViewportArchetype = Entity<Viewport.Viewport>;

const createViewportEntity = function ({ o, size, origin }: {
  o: orientation.Orientation;
  size: point.Point;
  origin: point.Point;
}): ViewportArchetype {
  return createEntity<Viewport.Viewport>({
    components: {
      ...Viewport.createViewportComponent({ o, size, origin })
    }
  });
};

export type {
  ViewportArchetype
};
export {
  createViewportEntity
};
