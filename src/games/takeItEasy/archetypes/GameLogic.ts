import { EntityManager } from '../../../framework/ecs/EntityManager.js';
import { layout, messaging, spawning } from '../../../framework/modules';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';
import * as messages from '../messages';

type GameLogicComponents =
  & messaging.components.OnMessage.OnMessage
  & messaging.components.SendMessage.SendMessage;
type GameLogicArchetype = Entity<GameLogicComponents>;

const createGameLogicEntity = function ({ entityManager, rootHexagonGridName }: {
  entityManager: EntityManager;
  rootHexagonGridName: string;
}): GameLogicArchetype {
  const gameLogicEntity = createEntity<GameLogicComponents>({
    components: {
      ...messaging.components.OnMessage.createOnMessage(),
      ...messaging.components.SendMessage.createSendMessage()
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
      const hexagonTiles = layout.findHexagonEntitiesAtCoordinates({ hexagonLayout: hexagonGrid, coordinates: message.payload.hexagon });

      if (hexagonTiles.size === 0) {
        return;
      }

      const clickedTile = hexagonTiles.values().next().value;

      console.log({ clickedTile });

      if (spawning.components.Despawn.entityHasDespawn(clickedTile)) {
        clickedTile.components.despawn.despawn();
      }
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
