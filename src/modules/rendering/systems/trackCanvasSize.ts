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

      if (
        oldSize !== undefined &&
        vector2d.equal(oldSize, newSize)
      ) {
        return;
      }

      /* eslint-disable no-param-reassign */
      canvas.width = newSize.x;
      canvas.height = newSize.y;
      /* eslint-enable no-param-reassign */

      const onCanvasChangeParams: Parameters<OnCanvasSizeChange.OnCanvasSizeChangeFunction>[0] = {
        oldSize,
        newSize
      };

      for (const entity of entityManager.getEntities(
        OnCanvasSizeChange.entityHasOnCanvasSizeChange
      )) {
        entity.components.onCanvasSizeChange(onCanvasChangeParams);
      }

      oldSize = newSize;
    }
  };
};

export {
  trackCanvasSizeFactory
};
