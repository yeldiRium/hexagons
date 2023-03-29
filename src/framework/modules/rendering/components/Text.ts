import { Entity } from '../../../ecs/Entity.js';

type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';

interface Text {
  text: {
    text: string;
    fontSizePx: number;
    bold: boolean;
    italic: boolean;
    align: TextAlign;
  };
}

const createText = function ({
  text,
  fontSizePx = 10,
  bold = false,
  italic = false,
  align = 'start'
}: {
  text: string;
  fontSizePx?: number;
  bold?: boolean;
  italic?: boolean;
  align?: TextAlign;
}): Text {
  return {
    text: {
      text,
      fontSizePx,
      bold,
      italic,
      align
    }
  };
};

const entityHasText = function (entity: Entity<any>): entity is Entity<Text> {
  return 'text' in entity.components;
};

export type {
  Text,
  TextAlign
};
export {
  createText,
  entityHasText
};
