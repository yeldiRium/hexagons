import { Entity } from '../../../ecs/Entity.js';
import { vector } from '../../../math';

interface AbsoluteLocation {
  absoluteLocation: {
    vector: vector.Vector;
  };
}

const createAbsoluteLocation = function ({ vector: initialVector }: {
  vector: vector.Vector;
}): AbsoluteLocation {
  let mVector = initialVector;

  return {
    absoluteLocation: {
      get vector (): vector.Vector {
        return mVector;
      },
      set vector (newVector: vector.Vector) {
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
