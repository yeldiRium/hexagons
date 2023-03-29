import { Message, MessagePayload, MessageType } from './Message.js';

type MessageCreator<TMessage extends Message<any, any>> =
  (MessagePayload<TMessage> extends undefined ? () => TMessage : (payload: MessagePayload<TMessage>) => TMessage) & {
    type: MessageType<TMessage>;
  };

type MessageInCreator<TMessageCreator> = TMessageCreator extends MessageCreator<infer TMessage> ? TMessage : never;

const messageCreator =
  <TType extends string = '', TPayload = undefined>(type: TType): MessageCreator<{ type: TType; payload: TPayload }> => {
    const creatorFunction = (payload?: TPayload): Message<TType, TPayload> => ({
      type,
      payload
    }) as any;

    creatorFunction.type = type;

    return creatorFunction;
  };

export type {
  MessageCreator,
  MessageInCreator
};
export {
  messageCreator
};
