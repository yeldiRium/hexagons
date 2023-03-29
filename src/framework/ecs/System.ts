import { EntityManager } from './EntityManager';

interface System {
  tick: (parameters: {
    entityManager: EntityManager;
    dt: number;
    isFirstTick: boolean;
  }) => void;
}

export type {
  System
};
