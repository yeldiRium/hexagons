import { orientation } from '../../../framework/math/hexagonGrid';
import { vector2d } from '../../../framework/math/physics2d';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';
import { layout, rendering } from '../../../framework/modules';

type HexagonGridComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.Location.Location
  & layout.components.HexagonLayout.HexagonLayout
  & layout.components.ZIndex.ZIndex
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange;
type HexagonGridArchetype = Entity<HexagonGridComponents>;

const createHexagonGridEntity = function ({ orientation: o, size, vector: initialVector }: {
  orientation: orientation.Orientation;
  size: vector2d.Vector2d;
  vector: vector2d.Vector2d;
}): HexagonGridArchetype {
  const hexagonGrid = createEntity<HexagonGridComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector: initialVector }),
      ...layout.components.HexagonLayout.createHexagonLayout({
        orientation: o,
        size
      }),
      ...layout.components.ZIndex.createZIndex(),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          // Set this function later on individual entities.
        }
      })
    }
  });

  return hexagonGrid;
};

export type {
  HexagonGridArchetype
};
export {
  createHexagonGridEntity
};