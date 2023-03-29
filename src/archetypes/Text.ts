import { color } from '../math';
import { vector2d } from '../math/physics2d';
import { createEntity, Entity } from '../ecs/Entity';
import { layout, rendering } from '../modules';

type TextComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.Location.Location
  & layout.components.ZIndex.ZIndex
  & rendering.components.Text.Text
  & rendering.components.FillColor.FillColor
  & rendering.components.Visibility.Visibility;
type TextArchetype = Entity<TextComponents>;

const createTextEntity = function ({ text, isVisible = true }: {
  text: string;
  isVisible?: boolean;
}): TextArchetype {
  return createEntity<TextComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector: vector2d.zero }),
      ...layout.components.ZIndex.createZIndex(),
      ...rendering.components.Text.createText(text),
      ...rendering.components.FillColor.createFillColor(color.predefined.black),
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
