import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { vector2d } from '../../../math/physics2d';

type OnCanvasSizeChangeFunction = (parameters: {
  oldSize?: vector2d.Vector2d;
  newSize: vector2d.Vector2d;
}) => void;

interface OnCanvasSizeChange {
  rendering: {
    onCanvasSizeChange: {
      onCanvasSizeChange: OnCanvasSizeChangeFunction;
      forceRelayout: boolean;
    };
  };
}

const createOnCanvasSizeChange = function ({ onCanvasSizeChange }: {
  onCanvasSizeChange: OnCanvasSizeChangeFunction;
}): OnCanvasSizeChange {
  return {
    rendering: {
      onCanvasSizeChange: {
        onCanvasSizeChange,
        forceRelayout: true
      }
    }
  };
};

const entityHasOnCanvasSizeChange = function (entity: Entity<any>): entity is Entity<OnCanvasSizeChange> {
  return has(entity.components, 'rendering.onCanvasSizeChange');
};

export type {
  OnCanvasSizeChange,
  OnCanvasSizeChangeFunction
};
export {
  createOnCanvasSizeChange,
  entityHasOnCanvasSizeChange
};
