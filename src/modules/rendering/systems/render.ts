import { AbsoluteLocation } from '../../layout/components';
import { Entity } from '../../../ecs/Entity.js';
import { Polygon } from '../components';
import { System } from '../../../ecs/System.js';

const isRenderable = function (entity: Entity<any>): entity is Entity<Polygon.Polygon & AbsoluteLocation.AbsoluteLocation> {
  return (
    Polygon.entityHasPolygon(entity) &&
      AbsoluteLocation.entityHasAbsoluteLocation(entity)
  );
};

const renderFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  const ctx = canvas.getContext('2d')!;

  return {
    tick ({ entityManager }): void {
      for (const entity of entityManager.getEntities(
        isRenderable
      )) {
        ctx.lineWidth = 5;
        ctx.beginPath();

        for (const corner of entity.components.polygon.polygon) {
          ctx.lineTo(
            corner.x + entity.components.absoluteLocation.vector.x,
            corner.y + entity.components.absoluteLocation.vector.y
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
