import { color } from '../../../math';
import { Entity } from '../../../ecs/Entity.js';

interface FillColor {
  fillColor: {
    color: color.Color;
  };
}

const createFillColor = function (initialColor: color.Color): FillColor {
  let mColor = initialColor;

  return {
    fillColor: {
      get color (): color.Color {
        return mColor;
      },
      set color (newColor: color.Color) {
        mColor = newColor;
      }
    }
  };
};

const entityHasFillColor = function (entity: Entity<any>): entity is Entity<FillColor> {
  return 'fillColor' in entity.components;
};

export type {
  FillColor
};
export {
  createFillColor,
  entityHasFillColor
};
