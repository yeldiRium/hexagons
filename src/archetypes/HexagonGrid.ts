import { orientation } from '../math/grid';
import { point } from '../math';
import { createEntity, Entity } from '../ecs/Entity.js';
import { grid, rendering } from '../modules';

type HexagonGridComponents =
  & grid.components.HexagonGrid.HexagonGrid
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange;
type HexagonGridArchetype = Entity<HexagonGridComponents>;

const createHexagonGridEntity = function ({ o, size, origin }: {
  o: orientation.Orientation;
  size: point.Point;
  origin: point.Point;
}): HexagonGridArchetype {
  const hexagonGrid = createEntity<HexagonGridComponents>({
    components: {
      ...grid.components.HexagonGrid.createHexagonGrid({ o, size, origin }),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange ({ newSize }): void {
          const { x: width, y: height } = newSize;

          const size = point.createPoint({ x: height / 20, y: height / 20 });
          const origin = point.createPoint({ x: width / 2, y: height / 2 });

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
