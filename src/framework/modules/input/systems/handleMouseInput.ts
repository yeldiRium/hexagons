import { Entity } from '../../../ecs/Entity.js';
import { Polygon } from '../../rendering/components';
import { System } from '../../../ecs/System.js';
import { AbsoluteLocation, ZIndex } from '../../layout/components';
import { OnClick, OnMouseOut, OnMouseOver } from '../components';
import { polygon2d, vector2d } from '../../../math/physics2d';

type RequiredCursorReceiverComponents = AbsoluteLocation.AbsoluteLocation & Polygon.Polygon & ZIndex.ZIndex;
const canReceiveCursor = function (entity: Entity<any>): entity is Entity<RequiredCursorReceiverComponents> {
  return (
    AbsoluteLocation.entityHasAbsoluteLocation(entity) &&
      Polygon.entityHasPolygon(entity) &&
      ZIndex.entityHasZIndex(entity)
  );
};

const handleMouseInput = function ({ rootElement }: {
  rootElement: HTMLElement;
}): System {
  let cursorPosition = vector2d.zero;
  let lastHoveredEntity: Entity<RequiredCursorReceiverComponents> | undefined;
  let unhandledClickEvents: MouseEvent[] = [];

  rootElement.addEventListener('mousemove', (event): void => {
    cursorPosition = vector2d.createVector2d({
      x: event.clientX,
      y: event.clientY
    });
  });
  rootElement.addEventListener('click', (event): void => {
    unhandledClickEvents.push(event);
  });

  return {
    tick ({ entityManager }): void {
      const relevantEntities = entityManager.getEntities(
        canReceiveCursor
      );
      const entitiesThatContainCursor = relevantEntities.filter(
        entity => polygon2d.containsVector({
          vector: cursorPosition,
          polygon: polygon2d.translate({
            polygon: entity.components.rendering.polygon.polygon,
            vector: entity.components.layout.absoluteLocation.vector
          })
        })
      );

      // ------------------
      // Handle hovering
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const hoverableEntityWithHighestZIndex = entitiesThatContainCursor.
        filter((entity): entity is Entity<RequiredCursorReceiverComponents & OnMouseOver.OnMouseOver> => OnMouseOver.entityHasOnMouseOver(entity)).
        sort(
          (a, b) => a.components.layout.zIndex.zIndex - b.components.layout.zIndex.zIndex
        ).at(-1);

      if (hoverableEntityWithHighestZIndex === undefined) {
        if (
          lastHoveredEntity !== undefined &&
          OnMouseOut.entityHasOnMouseOut(lastHoveredEntity)
        ) {
          lastHoveredEntity.components.input.onMouseOut({
            absoluteCursorCoordinates: cursorPosition,
            relativeCursorCoordinates: vector2d.sub(cursorPosition, lastHoveredEntity.components.layout.absoluteLocation.vector)
          });
        }

        lastHoveredEntity = undefined;
      } else if (hoverableEntityWithHighestZIndex !== lastHoveredEntity) {
        hoverableEntityWithHighestZIndex.components.input.onMouseOver({
          absoluteCursorCoordinates: cursorPosition,
          relativeCursorCoordinates: vector2d.sub(cursorPosition, hoverableEntityWithHighestZIndex.components.layout.absoluteLocation.vector)
        });

        if (
          lastHoveredEntity !== undefined &&
            OnMouseOut.entityHasOnMouseOut(lastHoveredEntity)
        ) {
          lastHoveredEntity.components.input.onMouseOut({
            absoluteCursorCoordinates: cursorPosition,
            relativeCursorCoordinates: vector2d.sub(cursorPosition, lastHoveredEntity.components.layout.absoluteLocation.vector)
          });
        }

        lastHoveredEntity = hoverableEntityWithHighestZIndex;
      }

      // ------------------
      // Handle clicking
      if (unhandledClickEvents.length > 0) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const clickableEntityWithHighestZIndex = entitiesThatContainCursor.filter((entity): entity is Entity<RequiredCursorReceiverComponents & OnClick.OnClick> => OnClick.entityHasOnClick(entity)).sort(
          (a, b) => a.components.layout.zIndex.zIndex - b.components.layout.zIndex.zIndex
        ).at(-1);

        if (clickableEntityWithHighestZIndex !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (const event of unhandledClickEvents) {
            clickableEntityWithHighestZIndex.components.input.onClick({
              absoluteCursorCoordinates: cursorPosition,
              relativeCursorCoordinates: vector2d.sub(cursorPosition, clickableEntityWithHighestZIndex.components.layout.absoluteLocation.vector)
            });
          }
        }

        unhandledClickEvents = [];
      }
    }
  };
};

export {
  handleMouseInput
};
