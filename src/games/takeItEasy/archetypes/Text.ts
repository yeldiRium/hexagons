import { color } from '../../../framework/math';
import { vector2d } from '../../../framework/math/physics2d';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { layout, rendering } from '../../../framework/modules';

type TextComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.Location.Location
  & layout.components.ZIndex.ZIndex
  & rendering.components.Text.Text
  & rendering.components.FillColor.FillColor
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.Visibility.Visibility;
type TextArchetype = Entity<TextComponents>;

const createTextEntity = function ({
  text,
  isVisible = true,
  location = vector2d.zero,
  fillColor = color.predefined.black,
  strokeColor = color.predefined.transparent,
  fontSizePx = 10,
  bold = false,
  italic = false,
  align = 'start'
}: {
  text: string;
  isVisible?: boolean;
  location?: vector2d.Vector2d;
  fillColor?: color.Color;
  strokeColor?: color.Color;
  fontSizePx?: number;
  bold?: boolean;
  italic?: boolean;
  align?: rendering.components.Text.TextAlign;
}): TextArchetype {
  return createEntity<TextComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector: location }),
      ...layout.components.ZIndex.createZIndex(),
      ...rendering.components.Text.createText({ text, fontSizePx, bold, italic, align }),
      ...rendering.components.FillColor.createFillColor(fillColor),
      ...rendering.components.StrokeColor.createStrokeColor(strokeColor),
      ...rendering.components.Visibility.createVisibility(isVisible)
    }
  });
};

export type {
  TextArchetype
};
export {
  createTextEntity
};
