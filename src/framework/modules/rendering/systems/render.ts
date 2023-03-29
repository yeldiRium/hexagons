import { color } from '../../../math';
import { Entity } from '../../../ecs/Entity.js';
import { System } from '../../../ecs/System.js';
import { AbsoluteLocation, ZIndex } from '../../layout/components';
import { FillColor, Polygon, StrokeColor, Text, Visibility } from '../components';

const isRenderable = function (entity: Entity<any>): entity is Entity<AbsoluteLocation.AbsoluteLocation & ZIndex.ZIndex & Visibility.Visibility> {
  return (
    AbsoluteLocation.entityHasAbsoluteLocation(entity) &&
      ZIndex.entityHasZIndex(entity) &&
      Visibility.entityHasVisibility(entity)
  );
};

const renderFactory = function ({ context }: {
  context: CanvasRenderingContext2D;
}): System {
  return {
    tick ({ entityManager }): void {
      /* eslint-disable no-param-reassign */
      const renderableEntities = entityManager.getEntities(
        isRenderable
      );
      const visibleEntities = renderableEntities.filter(entity => entity.components.visibility.isVisible);
      const zIndexSortedVisibleEntities = visibleEntities.sort(
        (a, b): number =>
          a.components.zIndex.zIndex - b.components.zIndex.zIndex
      );

      for (const entity of zIndexSortedVisibleEntities) {
        if (FillColor.entityHasFillColor(entity)) {
          context.fillStyle = color.toHexString({ color: entity.components.fillColor.color });
        }
        if (StrokeColor.entityHasStrokeColor(entity)) {
          context.strokeStyle = color.toHexString({ color: entity.components.strokeColor.color });
        }

        if (Polygon.entityHasPolygon(entity)) {
          context.lineWidth = 1;
          context.beginPath();

          for (const point of entity.components.polygon.polygon.points) {
            context.lineTo(
              point.x + entity.components.absoluteLocation.vector.x,
              point.y + entity.components.absoluteLocation.vector.y
            );
          }
          context.closePath();
          if (FillColor.entityHasFillColor(entity)) {
            context.fill();
          }
          if (StrokeColor.entityHasStrokeColor(entity)) {
            context.stroke();
          }
        }
        if (Text.entityHasText(entity)) {
          if (FillColor.entityHasFillColor(entity)) {
            context.fillText(
              entity.components.text.text,
              entity.components.absoluteLocation.vector.x,
              entity.components.absoluteLocation.vector.y
            );
          }
          if (StrokeColor.entityHasStrokeColor(entity)) {
            context.strokeText(
              entity.components.text.text,
              entity.components.absoluteLocation.vector.x,
              entity.components.absoluteLocation.vector.y
            );
          }
        }
      }
      /* eslint-enable no-param-reassign */
    }
  };
};

export {
  renderFactory
};
