import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

type OnMouseOutFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnMouseOut {
  onMouseOut: OnMouseOutFunction;
}

const createOnMouseOut = function ({ onMouseOut }: {
  onMouseOut: OnMouseOutFunction;
}): OnMouseOut {
  return {
    onMouseOut
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
