import { engineFactory } from './ecs/Engine';
import { hexagonGrid } from './math';
import { vector2d } from './math/physics2d';
import { HexagonGrid, HexagonTile, MessageDebugger, Text, Viewport } from './archetypes';
import { input, layout, messaging, rendering } from './modules';

window.addEventListener('DOMContentLoaded', (): void => {
  const rootElementName = 'viewport';

  const canvas = document.getElementById('game')! as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;
  const engine = engineFactory({ systems: [
    rendering.systems.trackCanvasSizeFactory({ canvas }),
    layout.systems.resolveAbsoluteLocationsFactory({ rootElementName }),
    layout.systems.calculateHexagonPolygonsFactory(),
    input.systems.handleMouseInput({ window }),
    messaging.systems.messageBusFactory(),
    rendering.systems.renderFactory({ canvas })
  ]});

  const entityManager = engine.getEntityManager();

  const messageDebuggerEntity = MessageDebugger.createMessageDebugger();

  messageDebuggerEntity.name = 'messageDebugger';
  entityManager.addEntity(messageDebuggerEntity);

  const viewportEntity = Viewport.createViewportEntity({
    location: vector2d.createVector2d({ x: 0, y: 0 })
  });

  viewportEntity.name = rootElementName;
  entityManager.addEntity(viewportEntity);

  const hexagonGridEntity = HexagonGrid.createHexagonGridEntity({
    vector: vector2d.zero,
    size: vector2d.zero,
    orientation: hexagonGrid.orientation.pointyOrientation
  });

  hexagonGridEntity.components.onCanvasSizeChange = function ({ newSize }): void {
    const { x: width, y: height } = newSize;

    hexagonGridEntity.components.hexagonLayout.layout.size = vector2d.createVector2d({ x: height / 20, y: height / 20 });
    hexagonGridEntity.components.location.vector = vector2d.createVector2d({ x: width / 2, y: height / 2 });
  };

  layout.attachChildToParent({ child: hexagonGridEntity, parent: viewportEntity });

  for (const hexagon of hexagonGrid.patterns.createRegularHexagon({ hexagonSize: 5 })) {
    const hexagonEntity = HexagonTile.createHexagonTileEntity({ hexagon });
    const textEntity = Text.createTextEntity({ text: `${hexagon.r} / ${hexagon.q}` });

    layout.attachChildToParent({ child: hexagonEntity, parent: hexagonGridEntity });
    layout.attachChildToParent({ child: textEntity, parent: hexagonEntity });
  }

  entityManager.addEntityAndChildren(hexagonGridEntity);

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
