import { color, hexagonGrid } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { input, layout, messaging, rendering, spawning } from '../../../framework/modules';
import { polygon2d, vector2d } from '../../../framework/math/physics2d';
import * as messages from '../messages';

type HexagonTileComponents =
  & input.components.OnClick.OnClick
  & input.components.OnMouseOver.OnMouseOver
  & input.components.OnMouseOut.OnMouseOut
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.ZIndex.ZIndex
  & messaging.components.SendMessage.SendMessage
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor
  & rendering.components.Visibility.Visibility
  & spawning.components.Despawn.Despawn;
type HexagonTileArchetype = Entity<HexagonTileComponents>;

const defaultBackgroundColor = color.predefined.white;

const createHexagonTileEntity = function ({ hexagon, isVisible = true }: {
  hexagon: hexagonGrid.hexagon.Hexagon;
  isVisible?: boolean;
}): HexagonTileArchetype {
  let fillColorBeforeHover: color.Color | undefined;

  const hexagonTileEntity = createEntity<HexagonTileComponents>({
    components: {
      ...input.components.OnClick.createOnClick({
        onClick () {
          hexagonTileEntity.components.sendMessage.sendMessage({
            message: messages.hexagonTileClicked({
              hexagon: hexagonTileEntity.components.hexagonLocation.hexagon
            })
          });
        }
      }),
      ...input.components.OnMouseOver.createOnMouseOver({
        onMouseOver () {
          fillColorBeforeHover = hexagonTileEntity.components.fillColor.color;
          hexagonTileEntity.components.fillColor.color = color.createColor({ r: 255, g: 0, b: 0 });
          hexagonTileEntity.components.sendMessage.sendMessage({
            message: messages.hexagonTileMouseOver({
              hexagon: hexagonTileEntity.components.hexagonLocation.hexagon
            })
          });
        }
      }),
      ...input.components.OnMouseOut.createOnMouseOut({
        onMouseOut () {
          hexagonTileEntity.components.fillColor.color = fillColorBeforeHover ?? defaultBackgroundColor;
          fillColorBeforeHover = undefined;
          hexagonTileEntity.components.sendMessage.sendMessage({
            message: messages.hexagonTileMouseOut({
              hexagon: hexagonTileEntity.components.hexagonLocation.hexagon
            })
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
      ...rendering.components.FillColor.createFillColor(defaultBackgroundColor),
      ...rendering.components.Visibility.createVisibility(isVisible),
      ...spawning.components.Despawn.createDespawn()
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
