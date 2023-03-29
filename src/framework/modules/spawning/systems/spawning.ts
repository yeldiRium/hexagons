import { LifeCycle } from '../../lifeCycle/components';
import { System } from '../../../ecs/System.js';
import { TreeNode } from '../../layout/components';
import { attachChildToParent, forEachDescendant, removeChildFromParent } from '../../layout';
import { Despawn, Spawn } from '../components';

const spawningFactory = function (): System {
  return {
    tick ({ entityManager }): void {
      for (const despawningEntity of entityManager.getEntities(
        Despawn.entityHasDespawn
      )) {
        if (despawningEntity.components.spawning.despawn.shouldDespawn) {
          if (TreeNode.entityHasTreeNode(despawningEntity)) {
            removeChildFromParent({ child: despawningEntity });
            entityManager.removeEntityAndChildren(despawningEntity.id);
          } else {
            entityManager.removeEntity(despawningEntity.id);
          }
        }
      }

      for (const lifecycleEntity of entityManager.getEntities(
        LifeCycle.entityHasLifeCycle
      )) {
        lifecycleEntity.components.lifeCycle.lifeCycle.wasJustSpawned = false;
      }

      for (const spawnerEntity of entityManager.getEntities(
        Spawn.entityHasSpawn
      )) {
        for (const spawnInstruction of spawnerEntity.components.spawning.spawn.entitiesToSpawn) {
          const { entity } = spawnInstruction;

          entityManager.addEntityAndChildren(entity);

          if (LifeCycle.entityHasLifeCycle(entity)) {
            if (TreeNode.entityHasTreeNode(entity)) {
              forEachDescendant({ entity,
                callback ({ entity: iEntity }) {
                  if (LifeCycle.entityHasLifeCycle(iEntity)) {
                    // eslint-disable-next-line no-param-reassign
                    iEntity.components.lifeCycle.lifeCycle.wasJustSpawned = true;
                  }
                } });
            } else {
              entity.components.lifeCycle.lifeCycle.wasJustSpawned = true;
            }
          }

          if ('parent' in spawnInstruction && spawnInstruction.parent !== undefined) {
            attachChildToParent({ child: entity, parent: spawnInstruction.parent });
          }
        }

        spawnerEntity.components.spawning.spawn.clearEntitiesToSpawn();
      }
    }
  };
};

export {
  spawningFactory
};
