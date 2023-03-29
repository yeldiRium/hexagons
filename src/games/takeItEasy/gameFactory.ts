import { engineFactory } from '../../framework/ecs/Engine';
import { vector2d } from '../../framework/math/physics2d';
import { GameController, gameControllerFactory } from '../../framework/GameController.js';
import { input, layout, messaging, rendering, spawning } from '../../framework/modules';
import { StateMachine, Viewport } from './archetypes';

const gameFactory = function (): GameController {
  return gameControllerFactory({
    initializeEngine ({ canvas, context }) {
      const rootEntityName = 'viewport';

      const engine = engineFactory({ systems: [
        spawning.systems.spawningFactory(),
        rendering.systems.trackCanvasSizeFactory({ canvas }),
        layout.systems.resolveAbsoluteLocationsFactory({ rootEntityName }),
        layout.systems.calculateHexagonPolygonsFactory(),
        input.systems.handleMouseInput({ rootElement: canvas }),
        messaging.systems.messageBusFactory(),
        rendering.systems.renderFactory({ context })
      ]});

      const entityManager = engine.getEntityManager();

      const viewportEntity = Viewport.createViewportEntity({
        location: vector2d.createVector2d({ x: 0, y: 0 })
      });

      viewportEntity.name = rootEntityName;
      entityManager.addEntity(viewportEntity);

      const stateMachineEntity = StateMachine.createStateMachineEntity({
        entityManager,
        canvas,
        context,
        rootEntityName
      });

      stateMachineEntity.name = 'stateMachine';
      entityManager.addEntityAndChildren(stateMachineEntity);

      return engine;
    },
    tick ({ engine, canvas, context, dt, isFirstTick }) {
      const currentCanvasRect = canvas.getBoundingClientRect();

      /* eslint-disable no-param-reassign */
      canvas.width = currentCanvasRect.width;
      canvas.height = currentCanvasRect.height;
      /* eslint-enable no-param-reassign */

      context.clearRect(0, 0, currentCanvasRect.width, currentCanvasRect.height);

      engine.runTick({ dt, isFirstTick });
    }
  });
};

export {
  gameFactory
};
