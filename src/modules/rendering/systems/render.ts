import { AbsoluteLocation } from '../../layout/components';
import { color } from '../../../math';
import { Entity } from '../../../ecs/Entity.js';
import { System } from '../../../ecs/System.js';
import { Polygon, StrokeColor } from '../components';

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
        if (StrokeColor.entityHasStrokeColor(entity)) {
          ctx.strokeStyle = color.toHexString({ color: entity.components.strokeColor.color });
        } else {
          ctx.strokeStyle = color.toHexString({ color: color.predefined.black });
        }

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
