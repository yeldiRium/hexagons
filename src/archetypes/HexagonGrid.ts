import { orientation } from '../math/hexagonGrid';
import { vector } from '../math';
import { createEntity, Entity } from '../ecs/Entity.js';
import { layout, rendering } from '../modules';

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
  size: vector.Vector;
  vector: vector.Vector;
}): HexagonGridArchetype {
  const hexagonGrid = createEntity<HexagonGridComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector: initialVector }),
      ...layout.components.HexagonLayout.createHexagonLayout({
        orientation: o,
        size
      }),
      ...layout.components.ZIndex.createZIndex(),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange ({ newSize }) {
          const { x: width, y: height } = newSize;

          hexagonGrid.components.hexagonLayout.layout.size = vector.createVector({ x: height / 20, y: height / 20 });
          hexagonGrid.components.location.vector = vector.createVector({ x: width / 2, y: height / 2 });
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
