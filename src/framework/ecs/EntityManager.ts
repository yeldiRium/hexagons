import { Entity } from './Entity';
import { layout } from '../modules';
import { defekt, error, Result, value } from 'defekt';

class NoEntityWithNameFound extends defekt({ code: 'NoEntityWithNameFound' }) {}
class NoEntityWithIdFound extends defekt({ code: 'NoEntityWithIdFound' }) {}

interface EntityManager {
  addEntity: (entity: Entity<any>) => void;
  addEntityAndChildren: (entity: Entity<any>) => void;
  removeEntity: (id: string) => boolean;
  removeEntityAndChildren: (id: string) => boolean;
  getEntityByName: (name: string) => Result<Entity<any>, NoEntityWithNameFound>;
  getEntityById: (id: string) => Result<Entity<any>, NoEntityWithIdFound>;
  getEntities: <TComponents = any>(predicate: (entity: Entity<any>) => entity is Entity<TComponents>) => Entity<TComponents>[];
  getAllEntities: () => Entity<any>[];
}

const createEntityManager = function (): EntityManager {
  const entities: Map<string, Entity<any>> = new Map();

  return {
    addEntity (entity): void {
      entities.set(entity.id, entity);
    },
    addEntityAndChildren (entity): void {
      this.addEntity(entity);

      if (layout.components.TreeNode.entityHasTreeNode(entity)) {
        for (const child of entity.components.treeNode.children) {
          this.addEntityAndChildren(child);
        }
      }
    },
    removeEntity (id): boolean {
      return entities.delete(id);
    },
    removeEntityAndChildren (id): boolean {
      const entity = entities.get(id);

      if (entity === undefined) {
        return false;
      }
      this.removeEntity(id);
      if (layout.components.TreeNode.entityHasTreeNode(entity)) {
        for (const child of entity.components.treeNode.children) {
          this.removeEntityAndChildren(child.id);
        }
      }

      return true;
    },
    getEntityByName <TComponents = any>(name: string): Result<Entity<TComponents>, NoEntityWithNameFound> {
      const entity = [ ...entities.values() ].find((iEntity): boolean => iEntity.name === name);

      if (entity === undefined) {
        return error(new NoEntityWithNameFound({ data: { name }}));
      }

      return value(entity);
    },
    getEntityById (id: string): Result<Entity<any>, NoEntityWithIdFound> {
      const entity = entities.get(id);

      if (entity === undefined) {
        return error(new NoEntityWithIdFound({ data: { id }}));
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
