import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';
import { vector2d } from '../../../math/physics2d';

interface Location {
  layout: {
    location: {
      vector: vector2d.Vector2d;
    };
  };
}

const createLocation = function ({ vector: initialVector }: {
  vector: vector2d.Vector2d;
}): Location {
  let mVector = initialVector;

  return {
    layout: {
      location: {
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

const entityHasLocation = function (entity: Entity<any>): entity is Entity<Location> {
  return has(entity.components, 'layout.location');
};

export type {
  Location
};
export {
  createLocation,
  entityHasLocation
};
