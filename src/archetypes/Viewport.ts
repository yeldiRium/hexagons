import { layout } from '../modules';
import { vector } from '../math';
import { createEntity, Entity } from '../ecs/Entity.js';

type ViewportComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode;
type ViewportArchetype = Entity<ViewportComponents>;

const createViewportEntity = function ({ location: initialLocation }: {
  location: vector.Vector;
}): ViewportArchetype {
  return createEntity<ViewportComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: initialLocation
      }),
      ...layout.components.TreeNode.createTreeNode()
    }
  });
};

export type {
  ViewportArchetype
};
export {
  createViewportEntity
};
