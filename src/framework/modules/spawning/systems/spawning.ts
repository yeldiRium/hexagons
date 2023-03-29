import { attachChildToParent } from '../../layout';
import { System } from '../../../ecs/System.js';
import { Despawn, Spawn } from '../components';

const spawningFactory = function (): System {
  return {
    tick ({ entityManager }): void {
      for (const despawningEntity of entityManager.getEntities(
        Despawn.entityHasDespawn
      )) {
        if (despawningEntity.components.despawn.shouldDespawn) {
          entityManager.removeEntityAndChildren(despawningEntity.id);
        }
      }

      for (const spawnerEntity of entityManager.getEntities(
        Spawn.entityHasSpawn
      )) {
        for (const spawnInstruction of spawnerEntity.components.spawn.entitiesToSpawn) {
          entityManager.addEntityAndChildren(spawnInstruction.entity);

          if ('parent' in spawnInstruction && spawnInstruction.parent !== undefined) {
            attachChildToParent({ child: spawnInstruction.entity, parent: spawnInstruction.parent });
          }
        }
      }
    }
  };
};

export {
  spawningFactory
};
