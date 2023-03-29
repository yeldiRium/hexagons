import { color } from '../../../math';
import { Entity } from '../../../ecs/Entity.js';

interface StrokeColor {
  strokeColor: {
    color: color.Color;
  };
}

const createStrokeColor = function (initialColor: color.Color): StrokeColor {
  let mColor = initialColor;

  return {
    strokeColor: {
      get color (): color.Color {
        return mColor;
      },
      set color (newColor: color.Color) {
        mColor = newColor;
      }
    }
  };
};

const entityHasStrokeColor = function (entity: Entity<any>): entity is Entity<StrokeColor> {
  return 'strokeColor' in entity.components;
};

export type {
  StrokeColor
};
export {
  createStrokeColor,
  entityHasStrokeColor
};
