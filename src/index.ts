import { engineFactory } from './ecs/Engine';
import { hexagonGrid, vector } from './math';
import { HexagonGrid, HexagonTile, Viewport } from './archetypes';
import { layout, rendering } from './modules';

window.addEventListener('DOMContentLoaded', (): void => {
  const rootElementName = 'viewport';

  const canvas = document.getElementById('game')! as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;
  const engine = engineFactory({ systems: [
    rendering.systems.trackCanvasSizeFactory({ canvas }),
    layout.systems.resolveAbsoluteLocationsFactory({ rootElementName }),
    layout.systems.calculateHexagonPolygonsFactory(),
    rendering.systems.renderFactory({ canvas })
  ]});

  const entityManager = engine.getEntityManager();

  const viewportEntity = Viewport.createViewportEntity({
    location: vector.createVector({ x: 0, y: 0 })
  });

  viewportEntity.name = rootElementName;
  entityManager.addEntity(viewportEntity);

  const hexagonGridEntity = HexagonGrid.createHexagonGridEntity({
    vector: vector.zero,
    size: vector.zero,
    orientation: hexagonGrid.orientation.pointyOrientation
  });

  entityManager.addEntity(hexagonGridEntity);
  layout.attachChildToParent({ child: hexagonGridEntity, parent: viewportEntity });

  for (const hexagon of hexagonGrid.patterns.createRegularHexagon({ hexagonSize: 5 })) {
    const hexagonEntity = HexagonTile.createHexagonTileEntity({ hexagon });

    entityManager.addEntity(hexagonEntity);
    layout.attachChildToParent({ child: hexagonEntity, parent: hexagonGridEntity });
  }

  let time = Date.now();
  const frame = (): void => {
    const newTime = Date.now();
    const dt = newTime - time;

    context.clearRect(0, 0, canvas.width, canvas.height);

    engine.runTick({ dt });
    time = newTime;
    window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame(frame);
});
