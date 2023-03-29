import { Entity } from '../../../ecs/Entity.js';

interface Text {
  text: {
    text: string;
  };
}

const createFillColor = function (initialText: string): Text {
  let mText = initialText;

  return {
    text: {
      get text (): string {
        return mText;
      },
      set text (newText: string) {
        mText = newText;
      }
    }
  };
};

const entityHasText = function (entity: Entity<any>): entity is Entity<Text> {
  return 'text' in entity.components;
};

export type {
  Text
};
export {
  createFillColor,
  entityHasText
};
