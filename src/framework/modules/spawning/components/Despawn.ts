import { Entity } from '../../../ecs/Entity.js';

interface Despawn {
  despawn: {
    shouldDespawn: boolean;
    despawn: () => void;
  };
}

const createDespawn = function (): Despawn {
  let mShouldDespawn = false;

  return {
    despawn: {
      get shouldDespawn (): boolean {
        return mShouldDespawn;
      },
      despawn (): void {
        mShouldDespawn = true;
      }
    }
  };
};

const entityHasDespawn = function (entity: Entity<any>): entity is Entity<Despawn> {
  return 'despawn' in entity.components;
};

export type {
  Despawn
};
export {
  createDespawn,
  entityHasDespawn
};
