import { Entity } from '../../../ecs/Entity.js';
import { Message } from '../Message.js';

interface SendMessage {
  sendMessage: {
    messagesToSend: Message<string, any>[];
    sendMessage: (parameters: { message: Message<string, any> }) => void;
    clearMessages: () => void;
  };
}

const createSendMessage = function (): SendMessage {
  let mMessages: Message<string, any>[] = [];

  return {
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
  };
};

const entityHasSendMessage = function (entity: Entity<any>): entity is Entity<SendMessage> {
  return 'sendMessage' in entity.components;
};

export type {
  SendMessage
};
export {
  createSendMessage,
  entityHasSendMessage
};
