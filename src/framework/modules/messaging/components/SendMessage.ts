import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { Message } from '../Message.js';

interface SendMessage {
  messaging: {
    sendMessage: {
      messagesToSend: Message<string, any>[];
      sendMessage: (parameters: { message: Message<string, any> }) => void;
      clearMessages: () => void;
    };
  };
}

const createSendMessage = function (): SendMessage {
  let mMessages: Message<string, any>[] = [];

  return {
    messaging: {
      sendMessage: {
        get messagesToSend (): Message<string, any>[] {
          return mMessages;
        },
        sendMessage ({ message }): void {
          mMessages.push(message);
        },
        clearMessages (): void {
          mMessages = [];
        }
      }
    }
  };
};

const entityHasSendMessage = function (entity: Entity<any>): entity is Entity<SendMessage> {
  return has(entity.components, 'messaging.sendMessage');
};

export type {
  SendMessage
};
export {
  createSendMessage,
  entityHasSendMessage
};
