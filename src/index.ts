import { engineFactory } from './ecs/Engine';
import { orientation } from './grid';
import { point } from './rendering';
import { HexTile, Viewport } from './archetypes';
import { mapTilesToScreenPolygonsFactory, renderFactory, scaleUiFactory } from './systems';

window.addEventListener('DOMContentLoaded', (): void => {
  const canvas = document.getElementById('game')! as HTMLCanvasElement;
  const engine = engineFactory({ systems: [
    scaleUiFactory({ canvas }),
    mapTilesToScreenPolygonsFactory(),
    renderFactory({ canvas })
  ]});

  const entityManager = engine.getEntityManager();

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

  // Main loop
  engine.runTick({ dt: 0 });
});
