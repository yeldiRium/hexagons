import { layout } from '../../../framework/modules';
import { vector2d } from '../../../framework/math/physics2d';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';

type ViewportComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.ZIndex.ZIndex;
type ViewportArchetype = Entity<ViewportComponents>;

const createViewportEntity = function ({ location: initialLocation }: {
  location: vector2d.Vector2d;
}): ViewportArchetype {
  return createEntity<ViewportComponents>({
    kind: 'Viewport',
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: initialLocation
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.ZIndex.createZIndex()
    }
  });
};

export type {
  ViewportArchetype
};
export {
  createViewportEntity
};
