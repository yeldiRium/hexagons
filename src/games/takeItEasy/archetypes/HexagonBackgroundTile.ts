import { color, hexagonGrid } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { input, layout, messaging, rendering, spawning } from '../../../framework/modules';
import { polygon2d, vector2d } from '../../../framework/math/physics2d';
import * as messages from '../messages';

type HexagonBackgroundTileComponents =
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
type HexagonBackgroundTileArchetype = Entity<HexagonBackgroundTileComponents>;

const defaultBackgroundColor = color.predefined.white;

const createHexagonBackgroundTileEntity = function ({ hexagon, isVisible = true }: {
  hexagon: hexagonGrid.hexagon.Hexagon;
  isVisible?: boolean;
}): HexagonBackgroundTileArchetype {
  let fillColorBeforeHover: color.Color | undefined;

  const hexagonBackgroundTileEntity = createEntity<HexagonBackgroundTileComponents>({
    components: {
      ...input.components.OnClick.createOnClick({
        onClick () {
          hexagonBackgroundTileEntity.components.sendMessage.sendMessage({
            message: messages.hexagonTileClicked({
              hexagon: hexagonBackgroundTileEntity.components.hexagonLocation.hexagon
            })
          });
        }
      }),
      ...input.components.OnMouseOver.createOnMouseOver({
        onMouseOver () {
          fillColorBeforeHover = hexagonBackgroundTileEntity.components.fillColor.color;
          hexagonBackgroundTileEntity.components.fillColor.color = color.createColor({ r: 180, g: 180, b: 180 });
          hexagonBackgroundTileEntity.components.sendMessage.sendMessage({
            message: messages.hexagonTileMouseOver({
              hexagon: hexagonBackgroundTileEntity.components.hexagonLocation.hexagon
            })
          });
        }
      }),
      ...input.components.OnMouseOut.createOnMouseOut({
        onMouseOut () {
          hexagonBackgroundTileEntity.components.fillColor.color = fillColorBeforeHover ?? defaultBackgroundColor;
          fillColorBeforeHover = undefined;
          hexagonBackgroundTileEntity.components.sendMessage.sendMessage({
            message: messages.hexagonTileMouseOut({
              hexagon: hexagonBackgroundTileEntity.components.hexagonLocation.hexagon
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

  return hexagonBackgroundTileEntity;
};

export type {
  HexagonBackgroundTileArchetype
};
export {
  createHexagonBackgroundTileEntity
};
