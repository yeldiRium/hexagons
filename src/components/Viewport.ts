import { Entity } from '../engine/Entity.js';
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
  return {
    viewport: {
      layout: layout.createLayout({
        orientation: o,
        size,
        origin
      })
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
