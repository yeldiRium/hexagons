import { color, hexagonGrid } from '../math';
import { createEntity, Entity } from '../ecs/Entity';
import { input, layout, messaging, rendering } from '../modules';
import { polygon2d, vector2d } from '../math/physics2d';

type HexagonTileComponents =
  & input.components.OnMouseOver.OnMouseOver
  & input.components.OnMouseOut.OnMouseOut
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.ZIndex.ZIndex
  & messaging.components.SendMessage.SendMessage
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor;
type HexagonTileArchetype = Entity<HexagonTileComponents>;

const defaultBackgroundColor = color.predefined.white;

const createHexagonTileEntity = function ({ hexagon }: {
  hexagon: hexagonGrid.hexagon.Hexagon;
}): HexagonTileArchetype {
  const hexagonTileEntity = createEntity<HexagonTileComponents>({
    components: {
      ...input.components.OnMouseOver.createOnMouseOver({
        onMouseOver () {
          hexagonTileEntity.components.fillColor.color = color.createColor({ r: 255, g: 0, b: 0 });
          hexagonTileEntity.components.sendMessage.sendMessage({
            message: {
              type: 'mouseOver',
              payload: { hexagon }
            }
          });
        }
      }),
      ...input.components.OnMouseOut.createOnMouseOut({
        onMouseOut () {
          hexagonTileEntity.components.fillColor.color = defaultBackgroundColor;
          hexagonTileEntity.components.sendMessage.sendMessage({
            message: {
              type: 'mouseOut',
              payload: { hexagon }
            }
          });
        }
      }),
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.HexagonLocation.createHexagonLocation({ hexagon }),
      ...layout.components.ZIndex.createZIndex(),
      ...messaging.components.SendMessage.createSendMessage(),
      ...rendering.components.Polygon.createPolygon({ polygon: polygon2d.createPolygon2d({ points: []}) }),
      ...rendering.components.StrokeColor.createStrokeColor(color.predefined.black),
      ...rendering.components.FillColor.createFillColor(defaultBackgroundColor)
    }
  });

  return hexagonTileEntity;
};

export type {
  HexagonTileArchetype
};
export {
  createHexagonTileEntity
};
