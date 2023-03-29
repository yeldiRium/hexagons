import { Polygon } from '../components';
import { System } from '../../../ecs/System.js';

const renderFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  const ctx = canvas.getContext('2d')!;

  return {
    tick ({ entityManager }): void {
      for (const entity of entityManager.getEntities(
        Polygon.entityHasPolygon
      )) {
        ctx.lineWidth = 5;
        ctx.beginPath();

        for (const corner of entity.components.polygon.polygon) {
          ctx.lineTo(
            corner.x,
            corner.y
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
