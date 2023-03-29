import { Entity } from '../ecs/Entity.js';
import { point } from '../rendering';
import { layout, orientation } from '../grid';

interface Viewport {
  viewport: {
    layout: layout.Layout;
  };
}

const createViewportComponent = function ({ o, size, origin }: {
  o: orientation.Orientation;
  size: point.Point;
  origin: point.Point;
}): Viewport {
  const mLayout = layout.createLayout({
    orientation: o,
    size,
    origin
  });

  return {
    viewport: {
      get layout (): layout.Layout {
        return mLayout;
      }
    }
  };
};

const entityHasViewportComponent = function (entity: Entity<any>): entity is Entity<Viewport> {
  return 'viewport' in entity.components;
};

export type {
  Viewport
};
export {
  createViewportComponent,
  entityHasViewportComponent
};
