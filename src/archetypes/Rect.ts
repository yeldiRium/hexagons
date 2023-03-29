import { vector } from '../math';
import { createEntity, Entity } from '../ecs/Entity.js';
import { layout, rendering } from '../modules';

type RectComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.Location.Location
  & rendering.components.Polygon.Polygon;
type RectArchetype = Entity<RectComponents>;

const createRectEntity = function ({ location: initialLocation, size }: {
  location: vector.Vector;
  size: number;
}): RectArchetype {
  return createEntity<RectComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector.createVector({ x: 0, y: 0 })
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector: initialLocation }),
      ...rendering.components.Polygon.createPolygon([
        vector.createVector({ x: 0, y: size }),
        vector.createVector({ x: size, y: size }),
        vector.createVector({ x: size, y: 0 }),
        vector.createVector({ x: 0, y: 0 })
      ])
    }
  });
};

export type {
  RectArchetype
};
export {
  createRectEntity
};
