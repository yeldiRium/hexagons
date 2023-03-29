import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

type TextAlign = 'left' | 'right' | 'center' | 'start' | 'end';

interface Text {
  rendering: {
    text: {
      text: string;
      fontSizePx: number;
      bold: boolean;
      italic: boolean;
      align: TextAlign;
    };
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
    rendering: {
      text: {
        text,
        fontSizePx,
        bold,
        italic,
        align
      }
    }
  };
};

const entityHasText = function (entity: Entity<any>): entity is Entity<Text> {
  return has(entity.components, 'rendering.text');
};

export type {
  Text,
  TextAlign
};
export {
  createText,
  entityHasText
};
