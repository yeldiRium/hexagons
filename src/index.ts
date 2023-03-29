import { Entity } from './Entity.js';
import { orientation } from './grid';
import { point } from './rendering';
import { HexagonLocation, Renderable } from './components';
import { HexTile, Viewport } from './archetypes';
import { mapTilesToScreenPolygons, renderFactory, scaleUiFactory } from './systems';

window.addEventListener('DOMContentLoaded', (): void => {
  const canvas = document.getElementById('game')! as HTMLCanvasElement;

  const viewportEntity = Viewport.createViewportEntity({
    o: orientation.pointyOrientation,
    size: point.createPoint({ x: 0, y: 0 }),
    origin: point.createPoint({ x: 0, y: 0 })
  });

  const scaleUiSystem = scaleUiFactory({ viewport: viewportEntity, canvas });
  const mapTilesToScreenSystem = mapTilesToScreenPolygons({ viewport: viewportEntity });
  const renderingSystem = renderFactory({ canvas });

  const entities = new Map<string, Entity<any>>();

  for (const entity of [
    HexTile.createHexTileEntity(0, 0),
    HexTile.createHexTileEntity(1, 0),
    HexTile.createHexTileEntity(3, -5)
  ]) {
    entities.set(entity.id, entity);
  }

  // Main loop
  const hextiles: Entity<HexagonLocation.HexagonLocation & Renderable.Renderable>[] = [];
  const renderables: Entity<Renderable.Renderable>[] = [];

  for (const entity of entities.values()) {
    if (Renderable.entityHasRenderableComponent(entity)) {
      renderables.push(entity);

      if (HexagonLocation.entityHasHexagonLocationComponent(entity)) {
        hextiles.push(entity);
      }
    }
  }

  scaleUiSystem({
    entities: [],
    entityIndex: entities
  });
  mapTilesToScreenSystem({
    entities: hextiles,
    entityIndex: entities
  });
  renderingSystem({
    entities: renderables,
    entityIndex: entities
  });
});
