import { Entity } from '../../../ecs/Entity';
import { HexagonGridArchetype } from '../../../archetypes/HexagonGrid';
import { HexagonLocation } from '../components';
import { layout } from '../../../math/grid';
import { rendering } from '../..';
import { System } from '../../../ecs/System.js';

const mapTilesToScreenPolygonsFactory = function (): System {
  return {
    tick ({ entityManager }): void {
      const hexagonGrid: HexagonGridArchetype = entityManager.getEntityByName('hexagonGrid').unwrapOrThrow();

      for (const entity of entityManager.getEntities(
        (iEntity: Entity<any>): iEntity is Entity<HexagonLocation.HexagonLocation & rendering.components.Polygon.Polygon> =>
          HexagonLocation.entityHasHexagonLocation(iEntity) &&
          rendering.components.Polygon.entityHasPolygon(iEntity)
      )) {
        entity.components.polygon.polygon = layout.hexagonCorners({
          layout: hexagonGrid.components.hexagonGrid.layout,
          coordinates: entity.components.hexagonLocation.coordinates
        });
      }
    }
  };
};

export {
  mapTilesToScreenPolygonsFactory
};
