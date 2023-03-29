import { point } from '../rendering';
import { Renderable } from '../components';
import { System } from '../engine/System.js';

const renderFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  const { width, height } = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d')!;

  const offset = point.createPoint({
    x: width / 2,
    y: height / 2
  });

  return ({ entityManager }): void => {
    for (const entity of entityManager.getEntities(
      Renderable.entityHasRenderableComponent
    )) {
      ctx.lineWidth = 5;

      for (const polygon of entity.components.renderable.polygons) {
        ctx.beginPath();

        for (const corner of polygon) {
          ctx.lineTo(
            /* eslint-disable @typescript-eslint/restrict-plus-operands */
            corner.x + offset.x,
            corner.y + offset.y
            /* eslint-enable @typescript-eslint/restrict-plus-operands */
          );
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  };
};

export {
  renderFactory
};
