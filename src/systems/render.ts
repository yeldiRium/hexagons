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

  return {
    tick ({ entityManager }): void {
      for (const entity of entityManager.getEntities(
        Renderable.entityHasRenderableComponent
      )) {
        ctx.lineWidth = 5;

        for (const polygon of entity.components.renderable.polygons) {
          ctx.beginPath();

          for (const corner of polygon) {
            ctx.lineTo(

              corner.x + offset.x,
              corner.y + offset.y
            );
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  };
};

export {
  renderFactory
};
