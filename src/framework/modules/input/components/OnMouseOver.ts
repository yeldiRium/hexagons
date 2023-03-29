import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { vector2d } from '../../../math/physics2d';

type OnMouseOverFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnMouseOver {
  input: {
    onMouseOver: OnMouseOverFunction;
  };
}

const createOnMouseOver = function ({ onMouseOver }: {
  onMouseOver: OnMouseOverFunction;
}): OnMouseOver {
  return {
    input: {
      onMouseOver
    }
  };
};

const entityHasOnMouseOver = function (entity: Entity<any>): entity is Entity<OnMouseOver> {
  return has(entity.components, 'input.onMouseOver');
};

export type {
  OnMouseOver
};
export {
  createOnMouseOver,
  entityHasOnMouseOver
};
