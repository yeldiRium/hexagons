import { color, vector } from '../math';
import { createEntity, Entity } from '../ecs/Entity';
import { layout, rendering } from '../modules';

type TextComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.Location.Location
  & rendering.components.Text.Text
  & rendering.components.FillColor.FillColor;
type TextArchetype = Entity<TextComponents>;

const createTextEntity = function ({ text }: {
  text: string;
}): TextArchetype {
  return createEntity<TextComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.Location.createLocation({ vector: vector.zero }),
      ...rendering.components.Text.createText(text),
      ...rendering.components.FillColor.createFillColor(color.predefined.black)
    }
  });
};

export type {
  TextArchetype
};
export {
  createTextEntity
};
