import { orientation } from '../math/hexagonGrid';
import { vector } from '../math';
import { createEntity, Entity } from '../ecs/Entity.js';
import { grid, rendering } from '../modules';

type HexagonGridComponents =
  & grid.components.HexagonGrid.HexagonGrid
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange;
type HexagonGridArchetype = Entity<HexagonGridComponents>;

const createHexagonGridEntity = function ({ orientation: o, size, origin }: {
  orientation: orientation.Orientation;
  size: vector.Vector;
  origin: vector.Vector;
}): HexagonGridArchetype {
  const hexagonGrid = createEntity<HexagonGridComponents>({
    components: {
      ...grid.components.HexagonGrid.createHexagonGrid({ orientation: o, size, origin }),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange ({ newSize }): void {
          const { x: width, y: height } = newSize;

          const size = vector.createVector({ x: height / 20, y: height / 20 });
          const origin = vector.createVector({ x: width / 2, y: height / 2 });

          hexagonGrid.components.hexagonGrid.layout.size = size;
          hexagonGrid.components.hexagonGrid.layout.origin = origin;
        }
      })
    }
  });

  return hexagonGrid;
};

export type {
  HexagonGridArchetype
};
export {
  createHexagonGridEntity
};
