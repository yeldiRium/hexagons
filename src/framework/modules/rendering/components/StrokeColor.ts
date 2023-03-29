import { color } from '../../../math';
import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface StrokeColor {
  rendering: {
    strokeColor: {
      color: color.Color;
    };
  };
}

const createStrokeColor = function (initialColor: color.Color): StrokeColor {
  let mColor = initialColor;

  return {
    rendering: {
      strokeColor: {
        get color(): color.Color {
          return mColor;
        },
        set color(newColor: color.Color) {
          mColor = newColor;
        }
      }
    }
  };
};

const entityHasStrokeColor = function (entity: Entity<any>): entity is Entity<StrokeColor> {
  return has(entity.components, 'rendering.strokeColor');
};

export type {
  StrokeColor
};
export {
  createStrokeColor,
  entityHasStrokeColor
};
