import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface Despawn {
  spawning: {
    despawn: {
      shouldDespawn: boolean;
      despawn: () => void;
    };
  };
}

const createDespawn = function (): Despawn {
  let mShouldDespawn = false;

  return {
    spawning: {
      despawn: {
        get shouldDespawn (): boolean {
          return mShouldDespawn;
        },
        despawn (): void {
          mShouldDespawn = true;
        }
      }
    }
  };
};

const entityHasDespawn = function (entity: Entity<any>): entity is Entity<Despawn> {
  return has(entity.components, 'spawning.despawn');
};

export type {
  Despawn
};
export {
  createDespawn,
  entityHasDespawn
};
