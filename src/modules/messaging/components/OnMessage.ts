import { Entity } from '../../../ecs/Entity.js';
import { Message, MessageType } from '../Message.js';

interface OnMessage {
  onMessage: {
    callback: Map<string, (parameters: { message: Message<string, any> }) => void>;
    addMessageListener: <TMessage extends Message<string, any>>(parameters: {
      type: MessageType<TMessage>;
      callback: (parameters: { message: TMessage }) => void;
    }) => void;
    removeMessageListener: (parameters: {
      type: string;
    }) => void;
  };
}

const createOnMessage = function (): OnMessage {
  const callbacks = new Map<string, (message: Message<string, any>) => void>();

  return {
    onMessage: {
      callback: new Map(),
      addMessageListener ({ type, callback }): void {
        callbacks.set(type, callback as any);
      },
      removeMessageListener ({ type }): void {
        callbacks.delete(type);
      }
    }
  };
};

const entityHasOnMessage = function (entity: Entity<any>): entity is Entity<OnMessage> {
  return 'onMessage' in entity.components;
};

export type {
  OnMessage
};
export {
  createOnMessage,
  entityHasOnMessage
};
