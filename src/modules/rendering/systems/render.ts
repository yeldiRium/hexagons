import { AbsoluteLocation } from '../../layout/components';
import { color } from '../../../math';
import { System } from '../../../ecs/System.js';
import { FillColor, Polygon, StrokeColor, Text } from '../components';

const renderFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  const ctx = canvas.getContext('2d')!;

  return {
    tick ({ entityManager }): void {
      for (const entity of entityManager.getEntities(
        AbsoluteLocation.entityHasAbsoluteLocation
      )) {
        if (StrokeColor.entityHasStrokeColor(entity)) {
          ctx.strokeStyle = color.toHexString({ color: entity.components.strokeColor.color });
        } else {
          ctx.strokeStyle = color.toHexString({ color: color.predefined.black });
        }
        if (FillColor.entityHasFillColor(entity)) {
          ctx.fillStyle = color.toHexString({ color: entity.components.fillColor.color });
        } else {
          ctx.fillStyle = color.toHexString({ color: color.predefined.white });
        }

        if (Polygon.entityHasPolygon(entity)) {
          ctx.lineWidth = 5;
          ctx.beginPath();

          for (const corner of entity.components.polygon.polygon) {
            ctx.lineTo(
              corner.x + entity.components.absoluteLocation.vector.x,
              corner.y + entity.components.absoluteLocation.vector.y
            );
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        if (Text.entityHasText(entity)) {
          if (FillColor.entityHasFillColor(entity)) {
            ctx.fillText(
              entity.components.text.text,
              entity.components.absoluteLocation.vector.x,
              entity.components.absoluteLocation.vector.y
            );
          }
          if (StrokeColor.entityHasStrokeColor(entity)) {
            ctx.strokeText(
              entity.components.text.text,
              entity.components.absoluteLocation.vector.x,
              entity.components.absoluteLocation.vector.y
            );
          }
        }
      }
    }
  };
};

export {
  renderFactory
};
