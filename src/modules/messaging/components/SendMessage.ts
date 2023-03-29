import { Entity } from '../../../ecs/Entity.js';
import { Message } from '../Message.js';

interface SendMessage {
  sendMessage: {
    messagesToSend: Message<string, any>[];
    sendMessage: (parameters: { message: Message<string, any> }) => void;
  };
}

const createSendMessage = function (): SendMessage {
  return {
    sendMessage: {
      messagesToSend: [],
      sendMessage ({ message }): void {
        this.messagesToSend.push(message);
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
