import { Entity } from '../ecs/Entity';
import { layout } from '../grid';
import { System } from '../ecs/System.js';
import { ViewportArchetype } from '../archetypes/Viewport';
import { HexagonLocation, Polygon } from '../components';

const mapTilesToScreenPolygonsFactory = function (): System {
  return {
    tick ({ entityManager }): void {
      const viewport: ViewportArchetype = entityManager.getEntityByName('viewport').unwrapOrThrow();

      for (const entity of entityManager.getEntities(
        (iEntity: Entity<any>): iEntity is Entity<HexagonLocation.HexagonLocation & Polygon.Polygon> =>
          HexagonLocation.entityHasHexagonLocation(iEntity) &&
          Polygon.entityHasPolygon(iEntity)
      )) {
        entity.components.polygon.polygon = layout.hexagonCorners({
          layout: viewport.components.viewport.layout,
          coordinates: entity.components.hexagonLocation.coordinates
        });
      }
    }
  };
};

export {
  mapTilesToScreenPolygonsFactory
};
