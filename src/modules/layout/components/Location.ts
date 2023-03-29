import { Entity } from '../../../ecs/Entity.js';
import { vector } from '../../../math';

interface Location {
  location: {
    vector: vector.Vector;
  };
}

const createLocation = function ({ vector: initialVector }: {
  vector: vector.Vector;
}): Location {
  let mVector = initialVector;

  return {
    location: {
      get vector (): vector.Vector {
        return mVector;
      },
      set vector (newVector: vector.Vector) {
        mVector = newVector;
      }
    }
  };
};

const entityHasLocation = function (entity: Entity<any>): entity is Entity<Location> {
  return 'location' in entity.components;
};

export type {
  Location
};
export {
  createLocation,
  entityHasLocation
};
