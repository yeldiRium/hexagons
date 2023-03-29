import { messaging } from '../../../framework/modules';
import { createEntity, Entity } from '../../../framework/ecs/Entity';

type MessageDebuggerComponents =
  & messaging.components.OnMessage.OnMessage;
type MessageDebuggerArchetype = Entity<MessageDebuggerComponents>;

const createMessageDebugger = function (): MessageDebuggerArchetype {
  const messageDebugger = createEntity<MessageDebuggerComponents>({
    components: {
      ...messaging.components.OnMessage.createOnMessage()
    }
  });

  messageDebugger.components.onMessage.addMessageListener({
    type: '*',
    callback ({ message }): void {
      console.log(`message: ${message.type}`, { payload: message.payload });
    }
  });

  return messageDebugger;
};

export type {
  MessageDebuggerArchetype
};
export {
  createMessageDebugger
};
