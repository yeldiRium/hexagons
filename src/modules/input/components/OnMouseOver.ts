import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

type OnMouseOverFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnMouseOver {
  onMouseOver: {
    onMouseOver: OnMouseOverFunction;
  };
}

const createOnMouseOver = function ({ onMouseOver: initialOnMouseOver }: {
  onMouseOver: OnMouseOverFunction;
}): OnMouseOver {
  let mOnMouseOver = initialOnMouseOver;

  return {
    onMouseOver: {
      get onMouseOver (): OnMouseOverFunction {
        return mOnMouseOver;
      },
      set onMouseOver (newOnMouseOver: OnMouseOverFunction) {
        mOnMouseOver = newOnMouseOver;
      }
    }
  };
};

const entityHasOnMouseOver = function (entity: Entity<any>): entity is Entity<OnMouseOver> {
  return 'onMouseOver' in entity.components;
};

export type {
  OnMouseOver
};
export {
  createOnMouseOver,
  entityHasOnMouseOver
};
