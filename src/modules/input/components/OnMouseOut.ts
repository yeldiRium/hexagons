import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

type OnMouseOutFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnMouseOut {
  onMouseOut: {
    onMouseOut: OnMouseOutFunction;
  };
}

const createOnMouseOut = function ({ onMouseOut: initialOnMouseOut }: {
  onMouseOut: OnMouseOutFunction;
}): OnMouseOut {
  let mOnMouseOut = initialOnMouseOut;

  return {
    onMouseOut: {
      get onMouseOut (): OnMouseOutFunction {
        return mOnMouseOut;
      },
      set onMouseOut (newOnMouseOut: OnMouseOutFunction) {
        mOnMouseOut = newOnMouseOut;
      }
    }
  };
};

const entityHasOnMouseOut = function (entity: Entity<any>): entity is Entity<OnMouseOut> {
  return 'onMouseOut' in entity.components;
};

export type {
  OnMouseOut
};
export {
  createOnMouseOut,
  entityHasOnMouseOut
};
