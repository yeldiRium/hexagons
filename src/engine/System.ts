import { EntityManager } from './EntityManager';

interface System {
  tick: (parameters: {
    entityManager: EntityManager;
    dt: number;
  }) => void;
}

export type {
  System
};
