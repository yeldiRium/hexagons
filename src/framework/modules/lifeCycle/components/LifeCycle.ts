import { Entity } from '../../../ecs/Entity.js';

interface LifeCycle {
  lifeCycle: {
    wasJustSpawned: boolean;
  };
}

const createLifeCycle = function (): LifeCycle {
  return {
    lifeCycle: {
      wasJustSpawned: true
    }
  };
};

const entityHasLifeCycle = function (entity: Entity<any>): entity is Entity<LifeCycle> {
  return 'lifeCycle' in entity.components;
};

export type {
  LifeCycle
};
export {
  createLifeCycle,
  entityHasLifeCycle
};
