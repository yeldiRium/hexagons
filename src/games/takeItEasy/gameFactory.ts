import { engineFactory } from '../../framework/ecs/Engine';
import { hexagonGrid } from '../../framework/math';
import { vector2d } from '../../framework/math/physics2d';
import { GameController, gameControllerFactory } from '../../framework/GameController.js';
import { GameLogic, HexagonGrid, HexagonTile, Text, Viewport } from './archetypes';
import { input, layout, messaging, rendering, spawning } from '../../framework/modules';

const gameFactory = function (): GameController {
  return gameControllerFactory({
    initializeEngine ({ canvas, context }) {
      const rootElementName = 'viewport';
      const rootHexagonGridName = 'rootHexagonGrid';

      const engine = engineFactory({ systems: [
        rendering.systems.trackCanvasSizeFactory({ canvas }),
        spawning.systems.spawningFactory(),
        layout.systems.resolveAbsoluteLocationsFactory({ rootElementName }),
        layout.systems.calculateHexagonPolygonsFactory(),
        input.systems.handleMouseInput({ rootElement: canvas }),
        messaging.systems.messageBusFactory(),
        rendering.systems.renderFactory({ context })
      ]});

      const entityManager = engine.getEntityManager();

      const gameLogicEntity = GameLogic.createGameLogicEntity({
        entityManager,
        rootHexagonGridName
      });

      gameLogicEntity.name = 'gameLogic';
      entityManager.addEntity(gameLogicEntity);

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

      hexagonGridEntity.name = rootHexagonGridName;
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

      return engine;
    },
    tick ({ engine, canvas, context, dt }) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      engine.runTick({ dt });
    }
  });
};

export {
  gameFactory
};
