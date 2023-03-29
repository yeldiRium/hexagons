import { messaging } from '../modules';
import { createEntity, Entity } from '../ecs/Entity';

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
      console.log('debugging message bus', { message });
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
