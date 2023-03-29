import { engineFactory } from './ecs/Engine';
import { vector } from './math';
import { layout, rendering } from './modules';
import { Rect, Viewport } from './archetypes';

window.addEventListener('DOMContentLoaded', (): void => {
  const rootElementName = 'viewport';

  const canvas = document.getElementById('game')! as HTMLCanvasElement;
  const context = canvas.getContext('2d')!;
  const engine = engineFactory({ systems: [
    rendering.systems.trackCanvasSizeFactory({ canvas }),
    layout.systems.resolveAbsoluteLocationsSystem({ rootElementName }),
    rendering.systems.renderFactory({ canvas })
  ]});

  const entityManager = engine.getEntityManager();

  const viewportEntity = Viewport.createViewportEntity({
    location: vector.createVector({ x: 0, y: 0 })
  });

  viewportEntity.name = rootElementName;
  entityManager.addEntity(viewportEntity);

  const outermostRect = Rect.createRectEntity({
    location: vector.createVector({ x: 50, y: 50 }),
    size: 100
  });

  entityManager.addEntity(outermostRect);
  layout.attachChildToParent({ child: outermostRect, parent: viewportEntity });

  const innerRect1 = Rect.createRectEntity({
    location: vector.createVector({ x: 10, y: 25 }),
    size: 20
  });

  entityManager.addEntity(innerRect1);
  layout.attachChildToParent({ child: innerRect1, parent: outermostRect });

  const innerRect2 = Rect.createRectEntity({
    location: vector.createVector({ x: 55, y: 60 }),
    size: 35
  });

  entityManager.addEntity(innerRect2);
  layout.attachChildToParent({ child: innerRect2, parent: outermostRect });

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
