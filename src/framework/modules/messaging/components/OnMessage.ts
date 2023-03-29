import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { Message, MessageType } from '../Message.js';

type CallbackMap = Map<string, (parameters: { message: Message<string, any> }) => void>;

interface OnMessage {
  messaging: {
    onMessage: {
      callbacks: CallbackMap;
      addMessageListener: <TMessage extends Message<string, any>>(parameters: {
        type: MessageType<TMessage>;
        callback: (parameters: { message: TMessage }) => void;
      }) => void;
      removeMessageListener: (parameters: {
        type: string;
      }) => void;
    };
  };
}

const createOnMessage = function (): OnMessage {
  const mCallbacks: CallbackMap = new Map();

  return {
    messaging: {
      onMessage: {
        get callbacks (): CallbackMap {
          return mCallbacks;
        },
        addMessageListener ({ type, callback }): void {
          mCallbacks.set(type, callback as any);
        },
        removeMessageListener ({ type }): void {
          mCallbacks.delete(type);
        }
      }
    }
  };
};

const entityHasOnMessage = function (entity: Entity<any>): entity is Entity<OnMessage> {
  return has(entity.components, 'messaging.onMessage');
};

export type {
  OnMessage
};
export {
  createOnMessage,
  entityHasOnMessage
};
