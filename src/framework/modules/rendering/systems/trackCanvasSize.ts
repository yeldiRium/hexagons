import { Entity } from '../../../ecs/Entity.js';
import { LifeCycle } from '../../lifeCycle/components';
import { OnCanvasSizeChange } from '../components';
import { System } from '../../../ecs/System.js';
import { vector2d } from '../../../math/physics2d';

const trackCanvasSizeFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  let oldSize: vector2d.Vector2d | undefined;

  return {
    tick ({ entityManager }): void {
      const currentCanvasRect = canvas.getBoundingClientRect();
      const newSize = vector2d.createVector2d({
        x: currentCanvasRect.width,
        y: currentCanvasRect.height
      });

      const onCanvasChangeParams: Parameters<OnCanvasSizeChange.OnCanvasSizeChangeFunction>[0] = {
        oldSize,
        newSize
      };

      const allReceivers: Entity<OnCanvasSizeChange.OnCanvasSizeChange>[] = [];
      const receiverIfNotChanged: Entity<OnCanvasSizeChange.OnCanvasSizeChange>[] = [];

      for (const entity of entityManager.getEntities(
        OnCanvasSizeChange.entityHasOnCanvasSizeChange
      )) {
        allReceivers.push(entity);

        if (LifeCycle.entityHasLifeCycle(entity) && entity.components.lifeCycle.wasJustSpawned) {
          receiverIfNotChanged.push(entity);
        }
      }

      if (
        oldSize !== undefined &&
        vector2d.equal(oldSize, newSize)
      ) {
        if (receiverIfNotChanged.length > 0) {
          console.log('notifying some of unchanged canvas size', {receiverIfNotChanged});
        }
        for (const receiver of receiverIfNotChanged) {
          receiver.components.onCanvasSizeChange(onCanvasChangeParams);
        }

        return;
      }

      for (const receiver of allReceivers) {
        receiver.components.onCanvasSizeChange(onCanvasChangeParams);
      }

      oldSize = newSize;
    }
  };
};

export {
  trackCanvasSizeFactory
};
