import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface LifeCycle {
  lifeCycle: {
    lifeCycle: {
      wasJustSpawned: boolean;
    };
  };
}

const createLifeCycle = function (): LifeCycle {
  return {
    lifeCycle: {
      lifeCycle: {
        wasJustSpawned: true
      }
    }
  };
};

const entityHasLifeCycle = function (entity: Entity<any>): entity is Entity<LifeCycle> {
  return has(entity.components, 'lifeCycle.lifeCycle');
};

export type {
  LifeCycle
};
export {
  createLifeCycle,
  entityHasLifeCycle
};
