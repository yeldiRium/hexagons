import { gameChip } from '../gameLogic';
import { TextHexagon } from '.';
import { color, hexagonGrid, physics2d } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { data, layout, lifeCycle, messaging, rendering, spawning } from '../../../framework/modules';

type HexagonGameChipComponents =
  & data.components.Data.Data<gameChip.GameChip>
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

const kind = 'HexagonGameChip';
const createHexagonGameChipEntity = function ({ hexagon, isVisible = true, gameChip: { firstValue, secondValue, thirdValue }}: {
  hexagon: hexagonGrid.hexagon.Hexagon;
  isVisible?: boolean;
  gameChip: gameChip.GameChip;
}): HexagonGameChipsArchetype {
  const hexagonGameChipEntity = createEntity<HexagonGameChipComponents>({
    kind,
    components: {
      ...data.components.Data.createData({ data: { firstValue, secondValue, thirdValue } }),
      ...layout.components.AbsoluteLocation.createAbsoluteLocation({
        vector: physics2d.vector2d.zero
      }),
      ...layout.components.TreeNode.createTreeNode(),
      ...layout.components.HexagonLocation.createHexagonLocation({ hexagon }),
      ...layout.components.HexagonLayout.createHexagonLayout({
        orientation: hexagonGrid.orientation.flatOrientation,
        size: physics2d.vector2d.zero
      }),
      ...layout.components.ZIndex.createZIndex(),
      ...lifeCycle.components.LifeCycle.createLifeCycle(),
      ...messaging.components.SendMessage.createSendMessage(),
      ...rendering.components.Polygon.createPolygon({
        polygon: physics2d.polygon2d.createPolygon2d({ points: []})
      }),
      ...rendering.components.StrokeColor.createStrokeColor(chipBorderColor),
      ...rendering.components.FillColor.createFillColor(chipBackgroundColor),
      ...rendering.components.Visibility.createVisibility(isVisible),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          // Set this later.
        }
      }),
      ...spawning.components.Despawn.createDespawn()
    }
  });

  const firstValueText = TextHexagon.createTextHexagonEntity({
    location: hexagonGrid.hexagon.createHexagon({ q: 0, r: -1 }),
    text: {
      text: `${firstValue}`,
      align: 'center',
      fillColor: textColors[firstValue],
      strokeColor: color.predefined.white,
      bold: true,
      fontSizePx: 20
    },
    textSizeMultiplier: 2
  });
  const secondValueText = TextHexagon.createTextHexagonEntity({
    location: hexagonGrid.hexagon.createHexagon({ q: -1, r: 1 }),
    text: {
      text: `${secondValue}`,
      align: 'center',
      fillColor: textColors[secondValue],
      strokeColor: color.predefined.white,
      bold: true,
      fontSizePx: 20
    },
    textSizeMultiplier: 2
  });
  const thirdValueText = TextHexagon.createTextHexagonEntity({
    location: hexagonGrid.hexagon.createHexagon({ q: 1, r: 0 }),
    text: {
      text: `${thirdValue}`,
      align: 'center',
      fillColor: textColors[thirdValue],
      strokeColor: color.predefined.white,
      bold: true,
      fontSizePx: 20
    },
    textSizeMultiplier: 2
  });

  layout.attachChildToParent({ child: firstValueText, parent: hexagonGameChipEntity });
  layout.attachChildToParent({ child: secondValueText, parent: hexagonGameChipEntity });
  layout.attachChildToParent({ child: thirdValueText, parent: hexagonGameChipEntity });

  hexagonGameChipEntity.components.onCanvasSizeChange.onCanvasSizeChange = (): void => {
    const hexagonLayout = hexagonGameChipEntity.components.treeNode.parent;

    if (hexagonLayout !== undefined) {
      if (!layout.components.HexagonLayout.entityHasHexagonLayout(hexagonLayout)) {
        throw new Error('Hexagon game chip must be the child of a hexagon layout.');
      }

      hexagonGameChipEntity.components.hexagonLayout.layout.size = physics2d.vector2d.mul(
        hexagonLayout.components.hexagonLayout.layout.size,
        0.3
      );
    }
  };

  return hexagonGameChipEntity;
};

export type {
  HexagonGameChipsArchetype
};
export {
  createHexagonGameChipEntity,
  kind
};
