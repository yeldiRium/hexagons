import { Entity } from '../../../ecs/Entity.js';
import { TreeNode } from '../../layout/components';

type SpawnInstruction<TEntityComponents = any> = TEntityComponents extends TreeNode.TreeNode ? {
  entity: Entity<TreeNode.TreeNode>;
  parent?: Entity<TreeNode.TreeNode>;
} : {
  entity: Entity<TEntityComponents>;
};
type SpawnFunction = <TEntityComponents = any>(parameters: SpawnInstruction<TEntityComponents>) => void;

interface Spawn {
  spawn: {
    spawnEntity: SpawnFunction;
    entitiesToSpawn: SpawnInstruction[];
    clearEntitiesToSpawn: () => void;
  };
}

const createSpawn = function (): Spawn {
  let mEntitiesToSpawn: SpawnInstruction[] = [];

  return {
    spawn: {
      get entitiesToSpawn (): SpawnInstruction[] {
        return mEntitiesToSpawn;
      },
      spawnEntity (spawnInstruction): void {
        mEntitiesToSpawn.push(spawnInstruction);
      },
      clearEntitiesToSpawn (): void {
        mEntitiesToSpawn = [];
      }
    }
  };
};

const entityHasSpawn = function (entity: Entity<any>): entity is Entity<Spawn> {
  return 'spawn' in entity.components;
};

export type {
  Spawn
};
export {
  createSpawn,
  entityHasSpawn
};
