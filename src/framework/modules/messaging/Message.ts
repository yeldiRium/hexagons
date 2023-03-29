interface Message<TType extends string, TPayload> {
  type: TType;
  payload: TPayload;
}

type MessageType<TMessage> = TMessage extends Message<infer TType, any> ? TType : never;
type MessagePayload<TMessage> = TMessage extends Message<any, infer TPayload> ? TPayload : never;

export type {
  Message,
  MessageType,
  MessagePayload
};
