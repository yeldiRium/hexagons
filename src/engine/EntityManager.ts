import { Entity } from './Entity';
import { defekt, error, Result, value } from 'defekt';

class NoEntityWithNameFound extends defekt({ code: 'NoEntityWithNameFound' }) {}

interface EntityManager {
  addEntity: (entity: Entity<any>) => void;
  removeEntity: (id: string) => boolean;
  getEntityByName: <TComponents = any>(name: string) => Result<Entity<TComponents>, NoEntityWithNameFound>;
  getEntities: <TComponents = any>(predicate: (entity: Entity<any>) => entity is Entity<TComponents>) => Entity<TComponents>[];
  getAllEntities: () => Entity<any>[];
}

const createEntityManager = function (): EntityManager {
  const entities: Map<string, Entity<any>> = new Map();

  return {
    addEntity (entity): void {
      entities.set(entity.id, entity);
    },
    removeEntity (id): boolean {
      return entities.delete(id);
    },
    getEntityByName <TComponents = any>(name: string): Result<Entity<TComponents>, NoEntityWithNameFound> {
      const entity = [ ...entities.values() ].find((iEntity): boolean => iEntity.name === name);

      if (entity === undefined) {
        return error(new NoEntityWithNameFound({ data: { name }}));
      }

      return value(entity);
    },
    getAllEntities (): Entity<any>[] {
      return [ ...entities.values() ];
    },
    getEntities <TComponents = any>(predicate: (entity: Entity<any>) => entity is Entity<TComponents>): Entity<TComponents>[] {
      return [ ...entities.values() ].filter((entity): entity is Entity<TComponents> => predicate(entity));
    }
  };
};

export type {
  EntityManager
};
export {
  createEntityManager
};
