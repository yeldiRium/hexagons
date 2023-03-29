import { Entity } from '../../../ecs/Entity.js';
import { Polygon } from '../../rendering/components';
import { System } from '../../../ecs/System.js';
import { AbsoluteLocation, ZIndex } from '../../layout/components';
import { OnMouseOut, OnMouseOver } from '../components';
import { polygon2d, vector2d } from '../../../math/physics2d';

type RequiredMouseOverComponents = AbsoluteLocation.AbsoluteLocation & Polygon.Polygon & OnMouseOver.OnMouseOver & ZIndex.ZIndex;
const canReceiveMouseOver = function (entity: Entity<any>): entity is Entity<RequiredMouseOverComponents> {
  return (
    AbsoluteLocation.entityHasAbsoluteLocation(entity) &&
      Polygon.entityHasPolygon(entity) &&
      OnMouseOver.entityHasOnMouseOver(entity) &&
      ZIndex.entityHasZIndex(entity)
  );
};

const handleMouseInputFactory = function ({ window }: {
  window: Window;
}): System {
  let cursorPosition = vector2d.zero;
  let lastHoveredEntity: Entity<RequiredMouseOverComponents> | undefined;

  window.addEventListener('mousemove', (event): void => {
    cursorPosition = vector2d.createVector2d({
      x: event.clientX,
      y: event.clientY
    });
  });

  return {
    tick ({ entityManager }): void {
      const relevantEntities = entityManager.getEntities(
        canReceiveMouseOver
      );
      const entitiesThatContainCursor = relevantEntities.filter(
        entity => polygon2d.containsVector({
          vector: cursorPosition,
          polygon: polygon2d.translate({
            polygon: entity.components.polygon.polygon,
            vector: entity.components.absoluteLocation.vector
          })
        })
      );

      if (entitiesThatContainCursor.length === 0) {
        if (
          lastHoveredEntity !== undefined &&
          OnMouseOut.entityHasOnMouseOut(lastHoveredEntity)
        ) {
          lastHoveredEntity.components.onMouseOut({
            absoluteCursorCoordinates: cursorPosition,
            relativeCursorCoordinates: vector2d.sub(cursorPosition, lastHoveredEntity.components.absoluteLocation.vector)
          });
        }

        return;
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const entityWithHighestZIndex = entitiesThatContainCursor.sort(
        (a, b) => a.components.zIndex.zIndex - b.components.zIndex.zIndex
      ).at(-1)!;

      entityWithHighestZIndex.components.onMouseOver({
        absoluteCursorCoordinates: cursorPosition,
        relativeCursorCoordinates: vector2d.sub(cursorPosition, entityWithHighestZIndex.components.absoluteLocation.vector)
      });

      if (
        lastHoveredEntity !== undefined &&
        lastHoveredEntity !== entityWithHighestZIndex &&
        OnMouseOut.entityHasOnMouseOut(lastHoveredEntity)
      ) {
        lastHoveredEntity.components.onMouseOut({
          absoluteCursorCoordinates: cursorPosition,
          relativeCursorCoordinates: vector2d.sub(cursorPosition, lastHoveredEntity.components.absoluteLocation.vector)
        });
      }
      lastHoveredEntity = entityWithHighestZIndex;
    }
  };
};

export {
  handleMouseInputFactory
};
