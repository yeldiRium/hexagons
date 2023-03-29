import { color, hexagonGrid, vector } from '../math';
import { createEntity, Entity } from '../ecs/Entity';
import { layout, rendering } from '../modules';

type HexagonTileComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.ZIndex.ZIndex
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor;
type HexagonTileArchetype = Entity<HexagonTileComponents>;

const createHexagonTileEntity = function ({ hexagon }: {
  hexagon: hexagonGrid.hexagon.Hexagon;
}): HexagonTileArchetype {
  return createEntity<HexagonTileComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.HexagonLocation.createHexagonLocation({ hexagon }),
      ...layout.components.ZIndex.createZIndex(),
      ...rendering.components.Polygon.createPolygon([]),
      ...rendering.components.StrokeColor.createStrokeColor(color.predefined.black),
      ...rendering.components.FillColor.createFillColor(color.predefined.white)
    }
  });
};

export type {
  HexagonTileArchetype
};
export {
  createHexagonTileEntity
};
