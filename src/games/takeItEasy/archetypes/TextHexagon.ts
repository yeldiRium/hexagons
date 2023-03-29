import { Text } from '.';
import { color, hexagonGrid, physics2d } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { input, layout, lifeCycle, rendering, spawning } from '../../../framework/modules';

type TextHexagonComponents =
  & input.components.OnClick.OnClick
  & input.components.OnMouseOver.OnMouseOver
  & input.components.OnMouseOut.OnMouseOut
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.ZIndex.ZIndex
  & lifeCycle.components.LifeCycle.LifeCycle
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor
  & rendering.components.Visibility.Visibility
  & spawning.components.Despawn.Despawn;
type TextHexagonArchetype = Entity<TextHexagonComponents>;

const createTextHexagonEntity = function ({
  location,
  fillColor = color.predefined.transparent,
  strokeColor = color.predefined.transparent,
  textSizeMultiplier = 1,
  text,
  isVisible = true
}: {
  location: hexagonGrid.hexagon.Hexagon;
  fillColor?: color.Color;
  strokeColor?: color.Color;
  textSizeMultiplier?: number;
  text: Parameters<typeof Text.createTextEntity>[0];
  textFillColor?: color.Color;
  textStrokeColor?: color.Color;
  isVisible?: boolean;
}): TextHexagonArchetype {
  const textHexagonEntity = createEntity<TextHexagonComponents>({
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
        vector: physics2d.vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.HexagonLocation.createHexagonLocation({ hexagon: location }),
      ...layout.components.ZIndex.createZIndex(),
      ...lifeCycle.components.LifeCycle.createLifeCycle(),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          // Set this later.
        }
      }),
      ...rendering.components.Polygon.createPolygon({ polygon: physics2d.polygon2d.createPolygon2d({ points: []}) }),
      ...rendering.components.StrokeColor.createStrokeColor(strokeColor),
      ...rendering.components.FillColor.createFillColor(fillColor),
      ...rendering.components.Visibility.createVisibility(isVisible),
      ...spawning.components.Despawn.createDespawn()
    }
  });
  const textEntity = Text.createTextEntity({
    ...text,
    isVisible
  });

  layout.attachChildToParent({ child: textEntity, parent: textHexagonEntity });

  textHexagonEntity.components.onCanvasSizeChange = (): void => {
    const hexagonLayout = textHexagonEntity.components.treeNode.parent;

    if (hexagonLayout !== undefined) {
      if (!layout.components.HexagonLayout.entityHasHexagonLayout(hexagonLayout)) {
        throw new Error('Text hexagon must be the child of a hexagon layout.');
      }

      const fontSizePx = hexagonLayout.components.hexagonLayout.layout.size.y * textSizeMultiplier;

      textEntity.components.text.fontSizePx = fontSizePx;
      textEntity.components.location.vector = physics2d.vector2d.createVector2d({
        x: 0,

        // Font alignments are shit.
        y: (fontSizePx / 2) - 3
      });
    }
  };

  return textHexagonEntity;
};

export type {
  TextHexagonArchetype
};
export {
  createTextHexagonEntity
};
