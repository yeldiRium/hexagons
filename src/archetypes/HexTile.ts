import { createEntity, Entity } from '../engine/Entity';
import { HexagonLocation, Renderable } from '../components';

type HexTileArchetype = Entity<HexagonLocation.HexagonLocation & Renderable.Renderable>;

const createHexTileEntity = function (q: number, r: number): HexTileArchetype {
  return createEntity<HexagonLocation.HexagonLocation & Renderable.Renderable>({
    components: {
      ...HexagonLocation.createHexagonLocation(q, r),
      ...Renderable.createRenderable([])
    }
  });
};

export type {
  HexTileArchetype
};
export {
  createHexTileEntity
};
