import { messaging } from '../../../framework/modules';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';

type GameControllerComponents =
  & messaging.components.OnMessage.OnMessage
  & messaging.components.SendMessage.SendMessage;
type GameControllerArchetype = Entity<GameControllerComponents>;

const createGameControllerEntity = function (): GameControllerArchetype {
  const gameControllerEntity = createEntity<GameControllerComponents>({
    components: {
      ...messaging.components.OnMessage.createOnMessage(),
      ...messaging.components.SendMessage.createSendMessage()
    }
  });

  gameControllerEntity.components.onMessage.addMessageListener({
    type: '*',
    callback ({ message }) {
      console.log(`message: ${message.type}`, { payload: message.payload });
    }
  });

  return gameControllerEntity;
};

export type {
  GameControllerArchetype
};
export {
  createGameControllerEntity
};
