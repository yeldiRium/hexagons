import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { vector2d } from '../../../math/physics2d';

type OnMouseOutFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnMouseOut {
  input: {
    onMouseOut: OnMouseOutFunction;
  };
}

const createOnMouseOut = function ({ onMouseOut }: {
  onMouseOut: OnMouseOutFunction;
}): OnMouseOut {
  return {
    input: {
      onMouseOut
    }
  };
};

const entityHasOnMouseOut = function (entity: Entity<any>): entity is Entity<OnMouseOut> {
  return has(entity.components, 'input.onMouseOut');
};

export type {
  OnMouseOut
};
export {
  createOnMouseOut,
  entityHasOnMouseOut
};
