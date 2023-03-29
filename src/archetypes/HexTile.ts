import { createEntity, Entity } from '../ecs/Entity';
import { grid, rendering } from '../modules';

type HexTileComponents =
  & grid.components.HexagonLocation.HexagonLocation
  & rendering.components.Polygon.Polygon;
type HexTileArchetype = Entity<HexTileComponents>;

const createHexTileEntity = function (q: number, r: number): HexTileArchetype {
  return createEntity<HexTileComponents>({
    components: {
      ...grid.components.HexagonLocation.createHexagonLocation(q, r),
      ...rendering.components.Polygon.createPolygon([])
    }
  });
};

export type {
  HexTileArchetype
};
export {
  createHexTileEntity
};
