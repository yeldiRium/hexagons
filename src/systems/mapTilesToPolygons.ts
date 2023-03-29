import { Entity } from '../Entity.js';
import { layout } from '../grid';
import { System } from './System.js';
import { HexagonLocation, Renderable, Viewport } from '../components';

const mapTilesToScreenPolygons = function ({ viewport }: {
  viewport: Entity<Viewport.Viewport>;
}): System<HexagonLocation.HexagonLocation & Renderable.Renderable> {
  return ({ entities }): void => {
    for (const entity of entities) {
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
