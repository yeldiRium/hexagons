import { System } from './System';
import { createEntityManager, EntityManager } from './EntityManager';

interface Engine {
  runTick: (parameters: {
    dt: number;
  }) => void;
  getEntityManager: () => EntityManager;
}

const engineFactory = ({ systems }: {
  systems: System[];
}): Engine => {
  const entityManager = createEntityManager();

  return {
    runTick ({ dt }): void {
      for (const system of systems) {
        system.tick({ entityManager, dt });
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
