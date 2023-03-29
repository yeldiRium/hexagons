import { Entity } from '../../../ecs/Entity.js';
import { point } from '../../../math';

type OnCanvasSizeChangeFunction = (parameters: {
  oldSize?: point.Point;
  newSize: point.Point;
}) => void;

interface OnCanvasSizeChange {
  onCanvasSizeChange: OnCanvasSizeChangeFunction;
}

const createOnCanvasSizeChange = function ({ onCanvasSizeChange }: {
  onCanvasSizeChange: OnCanvasSizeChangeFunction;
}): OnCanvasSizeChange {
  return {
    onCanvasSizeChange
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
