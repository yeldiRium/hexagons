import { color } from '../../../framework/math';
import { Text } from '.';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { input, layout, rendering, spawning } from '../../../framework/modules';
import { rect2d, vector2d } from '../../../framework/math/physics2d';

type TextBoxComponents =
  & input.components.OnClick.OnClick
  & input.components.OnMouseOver.OnMouseOver
  & input.components.OnMouseOut.OnMouseOut
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.Location.Location
  & layout.components.ZIndex.ZIndex
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor
  & rendering.components.Visibility.Visibility
  & spawning.components.Despawn.Despawn;
type TextBoxArchetype = Entity<TextBoxComponents>;

const createTextBoxEntity = function ({ context, text, isVisible = true, vector }: {
  context: CanvasRenderingContext2D;
  text: string;
  isVisible?: boolean;
  vector: vector2d.Vector2d;
}): TextBoxArchetype {
  const textMetrics = context.measureText(text);
  const topLeft = vector2d.createVector2d({
    x: -textMetrics.actualBoundingBoxLeft - 10,
    y: -textMetrics.actualBoundingBoxAscent - 10
  });
  const bottomRight = vector2d.createVector2d({
    x: textMetrics.actualBoundingBoxRight + 10,
    y: textMetrics.actualBoundingBoxDescent + 10
  });
  const rect = rect2d.createRect2d({ topLeft, bottomRight });

  const textBoxEntity = createEntity<TextBoxComponents>({
    components: {
      ...input.components.OnClick.createOnClick({
        onClick () {
          // Set this later.
        }
      }),
      ...input.components.OnMouseOver.createOnMouseOver({
        onMouseOver () {
          // Set this later.
        }
      }),
      ...input.components.OnMouseOut.createOnMouseOut({
        onMouseOut () {
          // Set this later.
        }
      }),
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector }),
      ...layout.components.ZIndex.createZIndex(),
      ...rendering.components.Polygon.createPolygon({ polygon: rect2d.toPolygon({ rect }) }),
      ...rendering.components.StrokeColor.createStrokeColor(color.predefined.transparent),
      ...rendering.components.FillColor.createFillColor(color.predefined.transparent),
      ...rendering.components.Visibility.createVisibility(isVisible),
      ...spawning.components.Despawn.createDespawn()
    }
  });
  const textEntity = Text.createTextEntity({ text, isVisible });

  layout.attachChildToParent({ child: textEntity, parent: textBoxEntity });

  return textBoxEntity;
};

export type {
  TextBoxArchetype
};
export {
  createTextBoxEntity
};
