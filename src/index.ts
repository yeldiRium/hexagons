import { engineFactory } from './ecs/Engine';
import { orientation } from './math/grid';
import { point } from './math';
import { grid, rendering } from './modules';
import { HexagonGrid, HexTile } from './archetypes';

window.addEventListener('DOMContentLoaded', (): void => {
  const canvas = document.getElementById('game')! as HTMLCanvasElement;
  const engine = engineFactory({ systems: [
    grid.systems.scaleHexagonGrid({ canvas }),
    grid.systems.mapTilesToScreenPolygonsFactory(),
    rendering.systems.renderFactory({ canvas })
  ]});

  const entityManager = engine.getEntityManager();

  const hexagonGridEntity = HexagonGrid.createHexagonGridEntity({
    o: orientation.pointyOrientation,
    size: point.createPoint({ x: 0, y: 0 }),
    origin: point.createPoint({ x: 0, y: 0 })
  });

  hexagonGridEntity.name = 'hexagonGrid';

  entityManager.addEntity(hexagonGridEntity);

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
