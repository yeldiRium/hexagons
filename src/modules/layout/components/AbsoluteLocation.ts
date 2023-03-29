import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

interface AbsoluteLocation {
  absoluteLocation: {
    vector: vector2d.Vector2d;
  };
}

const createAbsoluteLocation = function ({ vector: initialVector }: {
  vector: vector2d.Vector2d;
}): AbsoluteLocation {
  let mVector = initialVector;

  return {
    absoluteLocation: {
      get vector (): vector2d.Vector2d {
        return mVector;
      },
      set vector (newVector: vector2d.Vector2d) {
        mVector = newVector;
      }
    }
  };
};

const entityHasAbsoluteLocation = function (entity: Entity<any>): entity is Entity<AbsoluteLocation> {
  return 'absoluteLocation' in entity.components;
};

export type {
  AbsoluteLocation
};
export {
  createAbsoluteLocation,
  entityHasAbsoluteLocation
};
