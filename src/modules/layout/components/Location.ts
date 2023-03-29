import { Entity } from '../../../ecs/Entity.js';
import { vector2d } from '../../../math/physics2d';

interface Location {
  location: {
    vector: vector2d.Vector2d;
  };
}

const createLocation = function ({ vector: initialVector }: {
  vector: vector2d.Vector2d;
}): Location {
  let mVector = initialVector;

  return {
    location: {
      get vector (): vector2d.Vector2d {
        return mVector;
      },
      set vector (newVector: vector2d.Vector2d) {
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
