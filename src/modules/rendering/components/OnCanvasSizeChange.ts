import { Entity } from '../../../ecs/Entity.js';
import { vector } from '../../../math';

type OnCanvasSizeChangeFunction = (parameters: {
  oldSize?: vector.Vector;
  newSize: vector.Vector;
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
