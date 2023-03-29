import { Message } from '../Message.js';
import { System } from '../../../ecs/System.js';
import { OnMessage, SendMessage } from '../components';

const messageBusFactory = function (): System {
  return {
    tick ({ entityManager }): void {
      const messagesByType = new Map<string, Message<string, any>[]>();
      const allMessages: Message<string, any>[] = [];

      for (const messageSender of entityManager.getEntities(
        SendMessage.entityHasSendMessage
      )) {
        for (const message of messageSender.components.messaging.sendMessage.messagesToSend) {
          allMessages.push(message);

          if (!messagesByType.has(message.type)) {
            messagesByType.set(message.type, []);
          }

          messagesByType.get(message.type)!.push(message);
        }

        messageSender.components.messaging.sendMessage.clearMessages();
      }

      for (const messageReceiver of entityManager.getEntities(
        OnMessage.entityHasOnMessage
      )) {
        for (const [ messageType, onMessage ] of messageReceiver.components.messaging.onMessage.callbacks.entries()) {
          if (messageType === '*') {
            for (const message of allMessages) {
              onMessage({ message });
            }
            continue;
          }
          for (const message of messagesByType.get(messageType) ?? []) {
            onMessage({ message });
          }
        }
      }
    }
  };
};

export {
  messageBusFactory
};
