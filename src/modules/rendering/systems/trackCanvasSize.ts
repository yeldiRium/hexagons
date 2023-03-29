import { OnCanvasSizeChange } from '../components';
import { point } from '../../../math';
import { System } from '../../../ecs/System.js';

const trackCanvasSizeFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  let oldSize: point.Point | undefined;

  return {
    tick ({ entityManager }): void {
      const currentCanvasRect = canvas.getBoundingClientRect();
      const newSize = point.createPoint({
        x: currentCanvasRect.width,
        y: currentCanvasRect.height
      });

      if (
        oldSize !== undefined &&
        point.equal(oldSize, newSize)
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
