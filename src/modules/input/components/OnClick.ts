import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

type OnClickFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnClick {
  onClick: OnClickFunction;
}

const createOnClick = function ({ onClick }: {
  onClick: OnClickFunction;
}): OnClick {
  return {
    onClick
  };
};

const entityHasOnClick = function (entity: Entity<any>): entity is Entity<OnClick> {
  return 'onClick' in entity.components;
};

export type {
  OnClick
};
export {
  createOnClick,
  entityHasOnClick
};
