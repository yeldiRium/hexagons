import { System } from './System';
import { createEntityManager, EntityManager } from './EntityManager';

interface Engine {
  runTick: (parameters: {
    dt: number;
    isFirstTick: boolean;
  }) => void;
  getEntityManager: () => EntityManager;
}

const engineFactory = ({ systems }: {
  systems: System[];
}): Engine => {
  const entityManager = createEntityManager();

  return {
    runTick ({ dt, isFirstTick }): void {
      for (const system of systems) {
        system.tick({ entityManager, dt, isFirstTick });
      }
    },
    getEntityManager (): EntityManager {
      return entityManager;
    }
  };
};

export type {
  Engine
};
export {
  engineFactory
};
