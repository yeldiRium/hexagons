import { createEntity, Entity } from '../ecs/Entity';
import { HexagonLocation, Polygon } from '../components';

type HexTileArchetype = Entity<HexagonLocation.HexagonLocation & Polygon.Polygon>;

const createHexTileEntity = function (q: number, r: number): HexTileArchetype {
  return createEntity<HexagonLocation.HexagonLocation & Polygon.Polygon>({
    components: {
      ...HexagonLocation.createHexagonLocation(q, r),
      ...Polygon.createPolygon([])
    }
  });
};

export type {
  HexTileArchetype
};
export {
  createHexTileEntity
};
