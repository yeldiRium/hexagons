import { gameChip } from '../gameLogic';
import { Text } from '.';
import { color, hexagonGrid, physics2d } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { layout, lifeCycle, messaging, rendering, spawning } from '../../../framework/modules';
import { polygon2d, vector2d } from '../../../framework/math/physics2d';

type HexagonGameChipComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.HexagonLayout.HexagonLayout
  & layout.components.ZIndex.ZIndex
  & lifeCycle.components.LifeCycle.LifeCycle
  & rendering.components.Polygon.Polygon
  & rendering.components.StrokeColor.StrokeColor
  & rendering.components.FillColor.FillColor
  & rendering.components.Visibility.Visibility
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange
  & spawning.components.Despawn.Despawn;
type HexagonGameChipsArchetype = Entity<HexagonGameChipComponents>;

const chipBackgroundColor = color.createColor({ r: 60, g: 60, b: 60 });
const chipBorderColor = color.createColor({ r: 220, g: 220, b: 220 });

const textColors = [
  // The first one is a filler, so that the values can be used to index the colors.
  color.predefined.transparent,
  color.createColor({ r: 200, g: 200, b: 200 }),
  color.createColor({ r: 200, g: 0, b: 80 }),
  color.createColor({ r: 200, g: 80, b: 120 }),
  color.createColor({ r: 80, g: 80, b: 200 }),
  color.createColor({ r: 40, g: 40, b: 180 }),
  color.createColor({ r: 200, g: 0, b: 0 }),
  color.createColor({ r: 0, g: 200, b: 0 }),
  color.createColor({ r: 200, g: 120, b: 0 }),
  color.createColor({ r: 200, g: 200, b: 0 })
];

const createHexagonGameChipEntity = function ({ hexagon, isVisible = true, gameChip: { firstValue, secondValue, thirdValue }}: {
  hexagon: hexagonGrid.hexagon.Hexagon;
  isVisible?: boolean;
  gameChip: gameChip.GameChip;
}): HexagonGameChipsArchetype {
  const hexagonGameChipEntity = createEntity<HexagonGameChipComponents>({
    components: {
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.HexagonLocation.createHexagonLocation({ hexagon }),
      ...layout.components.HexagonLayout.createHexagonLayout({ orientation: hexagonGrid.orientation.flatOrientation, size: vector2d.zero }),
      ...layout.components.ZIndex.createZIndex(),
      ...lifeCycle.components.LifeCycle.createLifeCycle(),
      ...messaging.components.SendMessage.createSendMessage(),
      ...rendering.components.Polygon.createPolygon({ polygon: polygon2d.createPolygon2d({ points: []}) }),
      ...rendering.components.StrokeColor.createStrokeColor(chipBorderColor),
      ...rendering.components.FillColor.createFillColor(chipBackgroundColor),
      ...rendering.components.Visibility.createVisibility(isVisible),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          const hexagonLayout = hexagonGameChipEntity.components.treeNode.parent;

          if (hexagonLayout !== undefined) {
            if (!layout.components.HexagonLayout.entityHasHexagonLayout(hexagonLayout)) {
              throw new Error('Hexagon game chip must be the child of a hexagon layout.');
            }

            const width = hexagonLayout.components.hexagonLayout.layout.size.x;
            const height = hexagonLayout.components.hexagonLayout.layout.size.y;

            // TODO: set text positions.
          }
        }
      }),
      ...spawning.components.Despawn.createDespawn()
    }
  });

  const firstValueText = Text.createTextEntity({
    text: `${firstValue}`,
    align: 'center',
    location: physics2d.vector2d.createVector2d({ x: 0, y: -12 }),
    fillColor: textColors[firstValue],
    strokeColor: color.predefined.white,
    bold: true,
    fontSizePx: 20
  });
  const secondValueText = Text.createTextEntity({
    text: `${secondValue}`,
    align: 'center',
    location: physics2d.vector2d.createVector2d({ x: -18, y: 18 }),
    fillColor: textColors[secondValue],
    strokeColor: color.predefined.white,
    bold: true,
    fontSizePx: 20
  });
  const thirdValueText = Text.createTextEntity({
    text: `${thirdValue}`,
    align: 'center',
    location: physics2d.vector2d.createVector2d({ x: 18, y: 18 }),
    fillColor: textColors[thirdValue],
    strokeColor: color.predefined.white,
    bold: true,
    fontSizePx: 20
  });

  layout.attachChildToParent({ child: firstValueText, parent: hexagonGameChipEntity });
  layout.attachChildToParent({ child: secondValueText, parent: hexagonGameChipEntity });
  layout.attachChildToParent({ child: thirdValueText, parent: hexagonGameChipEntity });

  return hexagonGameChipEntity;
};

export type {
  HexagonGameChipsArchetype
};
export {
  createHexagonGameChipEntity
};
