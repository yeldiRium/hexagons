import { noop } from '../../../utils';
import { color, hexagonGrid } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { input, layout, lifeCycle, messaging, rendering, spawning } from '../../../framework/modules';
import { polygon2d, vector2d } from '../../../framework/math/physics2d';

type HexagonBackgroundTileComponents =
  & input.components.OnClick.OnClick
  & input.components.OnMouseOver.OnMouseOver
  & input.components.OnMouseOut.OnMouseOut
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.ZIndex.ZIndex
  & lifeCycle.components.LifeCycle.LifeCycle
  & messaging.components.SendMessage.SendMessage
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor
  & rendering.components.Visibility.Visibility
  & spawning.components.Despawn.Despawn;
type HexagonBackgroundTileArchetype = Entity<HexagonBackgroundTileComponents>;

const defaultBackgroundColor = color.predefined.white;

const createHexagonBackgroundTileEntity = function ({ hexagon, onClick = { onClick: noop }, isVisible = true }: {
  hexagon: hexagonGrid.hexagon.Hexagon;
  onClick?: Parameters<typeof input.components.OnClick.createOnClick>[0];
  isVisible?: boolean;
}): HexagonBackgroundTileArchetype {
  let fillColorBeforeHover: color.Color | undefined;

  const hexagonBackgroundTileEntity = createEntity({
    kind: 'HexagonBackgroundTile',
    components: [
      input.components.OnClick.createOnClick(onClick),
      input.components.OnMouseOver.createOnMouseOver({
        onMouseOver () {
          fillColorBeforeHover = hexagonBackgroundTileEntity.components.rendering.fillColor.color;
          hexagonBackgroundTileEntity.components.rendering.fillColor.color = color.createColor({ r: 180, g: 180, b: 180 });
        }
      }),
      input.components.OnMouseOut.createOnMouseOut({
        onMouseOut () {
          hexagonBackgroundTileEntity.components.rendering.fillColor.color = fillColorBeforeHover ?? defaultBackgroundColor;
          fillColorBeforeHover = undefined;
        }
      }),
      layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      layout.components.TreeNode.createTreeNode(),
      layout.components.HexagonLocation.createHexagonLocation({ hexagon }),
      layout.components.ZIndex.createZIndex(),
      lifeCycle.components.LifeCycle.createLifeCycle(),
      messaging.components.SendMessage.createSendMessage(),
      rendering.components.Polygon.createPolygon({ polygon: polygon2d.createPolygon2d({ points: []}) }),
      rendering.components.StrokeColor.createStrokeColor(color.predefined.black),
      rendering.components.FillColor.createFillColor(defaultBackgroundColor),
      rendering.components.Visibility.createVisibility(isVisible),
      spawning.components.Despawn.createDespawn()
    ]
  });

  return hexagonBackgroundTileEntity;
};

export type {
  HexagonBackgroundTileArchetype
};
export {
  createHexagonBackgroundTileEntity
};
