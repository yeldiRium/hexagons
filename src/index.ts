import { createEntityManager } from './engine/EntityManager';
import { orientation } from './grid';
import { point } from './rendering';
import { HexTile, Viewport } from './archetypes';
import { mapTilesToScreenPolygons, renderFactory, scaleUiFactory } from './systems';

window.addEventListener('DOMContentLoaded', (): void => {
  const canvas = document.getElementById('game')! as HTMLCanvasElement;

  const entityManager = createEntityManager();

  const viewportEntity = Viewport.createViewportEntity({
    o: orientation.pointyOrientation,
    size: point.createPoint({ x: 0, y: 0 }),
    origin: point.createPoint({ x: 0, y: 0 })
  });

  viewportEntity.name = 'viewport';

  entityManager.addEntity(viewportEntity);

  for (const entity of [
    HexTile.createHexTileEntity(0, 0),
    HexTile.createHexTileEntity(1, 0),
    HexTile.createHexTileEntity(3, -5)
  ]) {
    entityManager.addEntity(entity);
  }

  const scaleUiSystem = scaleUiFactory({ canvas });
  const mapTilesToScreenSystem = mapTilesToScreenPolygons();
  const renderingSystem = renderFactory({ canvas });

  // Main loop
  scaleUiSystem({
    entityManager
  });
  mapTilesToScreenSystem({
    entityManager
  });
  renderingSystem({
    entityManager
  });
});
