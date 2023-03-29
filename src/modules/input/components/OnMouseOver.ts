import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

type OnMouseOverFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnMouseOver {
  onMouseOver: OnMouseOverFunction;
}

const createOnMouseOver = function ({ onMouseOver }: {
  onMouseOver: OnMouseOverFunction;
}): OnMouseOver {
  return {
    onMouseOver
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
