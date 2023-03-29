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
      const visibleEntities = renderableEntities.filter(entity => entity.components.rendering.visibility.isVisible);
      const zIndexSortedVisibleEntities = visibleEntities.sort(
        (a, b): number =>
          a.components.layout.zIndex.zIndex - b.components.layout.zIndex.zIndex
      );

      for (const entity of zIndexSortedVisibleEntities) {
        if (FillColor.entityHasFillColor(entity)) {
          context.fillStyle = color.toHexString({ color: entity.components.rendering.fillColor.color });
        }
        if (StrokeColor.entityHasStrokeColor(entity)) {
          context.strokeStyle = color.toHexString({ color: entity.components.rendering.strokeColor.color });
        }

        if (Polygon.entityHasPolygon(entity)) {
          context.lineWidth = 1;
          context.beginPath();

          for (const point of entity.components.rendering.polygon.polygon.points) {
            context.lineTo(
              point.x + entity.components.layout.absoluteLocation.vector.x,
              point.y + entity.components.layout.absoluteLocation.vector.y
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
          const { fontSizePx, bold, italic, text, align } = entity.components.rendering.text;

          context.font = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${fontSizePx}px sans-serif`;
          context.textAlign = align;
          if (StrokeColor.entityHasStrokeColor(entity)) {
            context.strokeText(
              text,
              entity.components.layout.absoluteLocation.vector.x,
              entity.components.layout.absoluteLocation.vector.y
            );
          }
          if (FillColor.entityHasFillColor(entity)) {
            context.fillText(
              text,
              entity.components.layout.absoluteLocation.vector.x,
              entity.components.layout.absoluteLocation.vector.y
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
