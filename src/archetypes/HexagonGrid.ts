import { grid } from '../modules';
import { orientation } from '../math/grid';
import { point } from '../math';
import { createEntity, Entity } from '../ecs/Entity.js';

type HexagonGridComponents =
  & grid.components.HexagonGrid.HexagonGrid;
type HexagonGridArchetype = Entity<HexagonGridComponents>;

const createHexagonGridEntity = function ({ o, size, origin }: {
  o: orientation.Orientation;
  size: point.Point;
  origin: point.Point;
}): HexagonGridArchetype {
  return createEntity<HexagonGridComponents>({
    components: {
      ...grid.components.HexagonGrid.createHexagonGrid({ o, size, origin })
    }
  });
};

export type {
  HexagonGridArchetype
};
export {
  createHexagonGridEntity
};
