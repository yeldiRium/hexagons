import { point } from '../rendering';
import { Polygon } from '../components';
import { System } from '../ecs/System.js';

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
        Polygon.entityHasPolygon
      )) {
        ctx.lineWidth = 5;
        ctx.beginPath();

        for (const corner of entity.components.polygon.polygon) {
          ctx.lineTo(

            corner.x + offset.x,
            corner.y + offset.y
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
