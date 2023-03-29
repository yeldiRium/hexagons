import { color } from '../../../math';
import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface FillColor {
  rendering: {
    fillColor: {
      color: color.Color;
    };
  };
}

const createFillColor = function (initialColor: color.Color): FillColor {
  let mColor = initialColor;

  return {
    rendering: {
      fillColor: {
        get color (): color.Color {
          return mColor;
        },
        set color (newColor: color.Color) {
          mColor = newColor;
        }
      }
    }
  };
};

const entityHasFillColor = function (entity: Entity<any>): entity is Entity<FillColor> {
  return has(entity.components, 'rendering.fillColor');
};

export type {
  FillColor
};
export {
  createFillColor,
  entityHasFillColor
};
