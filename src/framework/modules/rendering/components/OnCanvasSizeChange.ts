import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

type OnCanvasSizeChangeFunction = (parameters: {
  oldSize?: vector2d.Vector2d;
  newSize: vector2d.Vector2d;
}) => void;

interface OnCanvasSizeChange {
  onCanvasSizeChange: {
    onCanvasSizeChange: OnCanvasSizeChangeFunction;
    forceRelayout: boolean;
  };
}

const createOnCanvasSizeChange = function ({ onCanvasSizeChange }: {
  onCanvasSizeChange: OnCanvasSizeChangeFunction;
}): OnCanvasSizeChange {
  return {
    onCanvasSizeChange: {
      onCanvasSizeChange,
      forceRelayout: true
    }
  };
};

const entityHasOnCanvasSizeChange = function (entity: Entity<any>): entity is Entity<OnCanvasSizeChange> {
  return 'onCanvasSizeChange' in entity.components;
};

export type {
  OnCanvasSizeChange,
  OnCanvasSizeChangeFunction
};
export {
  createOnCanvasSizeChange,
  entityHasOnCanvasSizeChange
};
