import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { vector2d } from '../../../math/physics2d';

interface AbsoluteLocation {
  layout: {
    absoluteLocation: {
      vector: vector2d.Vector2d;
    };
  };
}

const createAbsoluteLocation = function ({ vector: initialVector }: {
  vector: vector2d.Vector2d;
}): AbsoluteLocation {
  let mVector = initialVector;

  return {
    layout: {
      absoluteLocation: {
        get vector (): vector2d.Vector2d {
          return mVector;
        },
        set vector (newVector: vector2d.Vector2d) {
          mVector = newVector;
        }
      }
    }
  };
};

const entityHasAbsoluteLocation = function (entity: Entity<any>): entity is Entity<AbsoluteLocation> {
  return has(entity.components, 'layout.absoluteLocation');
};

export type {
  AbsoluteLocation
};
export {
  createAbsoluteLocation,
  entityHasAbsoluteLocation
};
