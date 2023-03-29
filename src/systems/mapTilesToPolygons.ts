import { Entity } from '../engine/Entity';
import { layout } from '../grid';
import { System } from '../engine/System.js';
import { HexagonLocation, Renderable } from '../components';

const mapTilesToScreenPolygons = function (): System {
  return ({ entityManager }): void => {
    const viewport = entityManager.getEntityByName('viewport').unwrapOrThrow();

    for (const entity of entityManager.getEntities(
      (iEntity: Entity<any>): iEntity is Entity<HexagonLocation.HexagonLocation & Renderable.Renderable> =>
        HexagonLocation.entityHasHexagonLocationComponent(iEntity) &&
          Renderable.entityHasRenderableComponent(iEntity)
    )) {
      entity.components.renderable.polygons = [
        layout.hexagonCorners({
          layout: viewport.components.viewport.layout,
          coordinates: entity.components.hexagonLocation.coordinates
        })
      ];
    }
  };
};

export {
  mapTilesToScreenPolygons
};
