import { TextHexagon } from '.';
import { createEntity, Entity } from '../../../framework/ecs/Entity';
import { hexagonGrid, physics2d } from '../../../framework/math';
import { layout, lifeCycle, messaging, rendering, spawning } from '../../../framework/modules';

type HexagonScoreChipComponents =
  & layout.components.AbsoluteLocation.AbsoluteLocation
  & layout.components.TreeNode.TreeNode
  & layout.components.HexagonLocation.HexagonLocation
  & layout.components.HexagonLayout.HexagonLayout
  & layout.components.ZIndex.ZIndex
  & lifeCycle.components.LifeCycle.LifeCycle
  & rendering.components.Polygon.Polygon
  & rendering.components.Visibility.Visibility
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange
  & spawning.components.Despawn.Despawn;
type HexagonScoreChipArchetype = Entity<HexagonScoreChipComponents>;

const kind = 'HexagonScoreChip';
const createHexagonScoreChip = function ({ hexagon, orientation, score, isVisible = true }: {
  hexagon: hexagonGrid.hexagon.Hexagon;
  orientation: hexagonGrid.hexagon.Direction;
  score: number;
  isVisible?: boolean;
}): HexagonScoreChipArchetype {
  const hexagonGameChipEntity = createEntity<HexagonScoreChipComponents>({
    kind,
    components: {
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
      ...rendering.components.Visibility.createVisibility(isVisible),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          // Set this later.
        }
      }),
      ...spawning.components.Despawn.createDespawn()
    }
  });

  const scoreText = TextHexagon.createTextHexagonEntity({
    location: hexagonGrid.hexagon.direction(orientation),
    text: {
      text: `${score}`,
      align: 'center'
    },
    textSizeMultiplier: 2
  });

  layout.attachChildToParent({
    child: scoreText,
    parent: hexagonGameChipEntity
  });

  hexagonGameChipEntity.components.onCanvasSizeChange = (): void => {
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
  HexagonScoreChipArchetype
};
export {
  createHexagonScoreChip,
  kind
};
