import { Message, MessagePayload } from './Message.js';

type MessageCreator<TMessage extends Message<any, any>> =
  MessagePayload<TMessage> extends undefined ? () => TMessage : (payload: MessagePayload<TMessage>) => TMessage;

const messageCreator =
  <TType extends string = '', TPayload = undefined>(type: TType): MessageCreator<{ type: TType; payload: TPayload }> =>
    (payload?: TPayload): Message<TType, TPayload> => ({
      type,
      payload
    }) as any;

export {
  messageCreator
};
export type {
  MessageCreator
};
