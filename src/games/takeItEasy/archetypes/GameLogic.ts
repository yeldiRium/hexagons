import { color, physics2d } from '../../../framework/math';
import { HexagonTile, Text } from '.';
import { EntityManager } from '../../../framework/ecs/EntityManager.js';
import { layout, messaging, spawning } from '../../../framework/modules';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';
import * as messages from '../messages';
import { attachChildToParent } from '../../../framework/modules/layout';

type GameLogicComponents =
  & messaging.components.OnMessage.OnMessage
  & messaging.components.SendMessage.SendMessage
  & spawning.components.Spawn.Spawn;
type GameLogicArchetype = Entity<GameLogicComponents>;

const createGameLogicEntity = function ({ entityManager, rootHexagonGridName }: {
  entityManager: EntityManager;
  rootHexagonGridName: string;
}): GameLogicArchetype {
  const gameLogicEntity = createEntity<GameLogicComponents>({
    components: {
      ...messaging.components.OnMessage.createOnMessage(),
      ...messaging.components.SendMessage.createSendMessage(),
      ...spawning.components.Spawn.createSpawn()
    }
  });

  gameLogicEntity.components.onMessage.addMessageListener({
    type: '*',
    callback ({ message }) {
      console.log(`message: ${message.type}`, { payload: message.payload });
    }
  });

  gameLogicEntity.components.onMessage.addMessageListener<messaging.messageCreator.MessageInCreator<typeof messages.hexagonTileClicked>>({
    type: messages.hexagonTileClicked.type,
    callback ({ message }) {
      const hexagonGrid = entityManager.getEntityByName(rootHexagonGridName).unwrapOrThrow();
      const hexagonCoordinates = message.payload.hexagon;
      const hexagonTiles = layout.findHexagonEntitiesAtCoordinates({
        hexagonLayout: hexagonGrid,
        coordinates: hexagonCoordinates
      });

      if (hexagonTiles.size === 0) {
        return;
      }

      const clickedTile = hexagonTiles.values().next().value;

      if (spawning.components.Despawn.entityHasDespawn(clickedTile)) {
        clickedTile.components.despawn.despawn();
      }
      const newHexagonTile = HexagonTile.createHexagonTileEntity({
        hexagon: hexagonCoordinates
      });
      const newText = Text.createTextEntity({ text: 'foobar' });

      newText.components.location.vector = physics2d.vector2d.createVector2d({ x: -20, y: 5 });
      newHexagonTile.components.fillColor.color = color.createColor({ r: 0, g: 150, b: 0 });

      attachChildToParent({ child: newText, parent: newHexagonTile });
      gameLogicEntity.components.spawn.spawnEntity({ entity: newHexagonTile, parent: hexagonGrid });
    }
  });

  return gameLogicEntity;
};

export type {
  GameLogicArchetype
};
export {
  createGameLogicEntity
};
