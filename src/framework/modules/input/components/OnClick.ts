import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { vector2d } from '../../../math/physics2d';

type OnClickFunction = (parameters: {
  relativeCursorCoordinates: vector2d.Vector2d;
  absoluteCursorCoordinates: vector2d.Vector2d;
}) => void;

interface OnClick {
  input: {
    onClick: OnClickFunction;
  };
}

const createOnClick = function ({ onClick }: {
  onClick: OnClickFunction;
}): OnClick {
  return {
    input: {
      onClick
    }
  };
};

const entityHasOnClick = function (entity: Entity<any>): entity is Entity<OnClick> {
  return has(entity.components, 'input.onClick');
};

export type {
  OnClick
};
export {
  createOnClick,
  entityHasOnClick
};
