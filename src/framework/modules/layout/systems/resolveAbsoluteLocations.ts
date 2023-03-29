import { Entity } from '../../../ecs/Entity.js';
import { hexagonGrid } from '../../../math';
import { System } from '../../../ecs/System.js';
import { vector2d } from '../../../math/physics2d';
import { AbsoluteLocation, HexagonLayout, HexagonLocation, Location, TreeNode } from '../components';

const isInnerTreeNode = function (entity: Entity<any>): entity is Entity<AbsoluteLocation.AbsoluteLocation & TreeNode.TreeNode & Location.Location> {
  return AbsoluteLocation.entityHasAbsoluteLocation(entity) &&
    TreeNode.entityHasTreeNode(entity) &&
    Location.entityHasLocation(entity);
};

const resolveAbsoluteLocationsFactory = function ({ rootEntityName }: {
  rootEntityName: string;
}): System {
  return {
    tick ({ entityManager }): void {
      const rootEntityResult = entityManager.getEntityByName(rootEntityName);

      if (rootEntityResult.hasError()) {
        throw new Error('No root element found.');
      }

      const rootEntity = rootEntityResult.value;

      if (
        !AbsoluteLocation.entityHasAbsoluteLocation(rootEntity) ||
        !TreeNode.entityHasTreeNode(rootEntity)
      ) {
        throw new Error('Root element does not fulfil requirements. It must have an AbsoluteLocation and a TreeNode.');
      }

      const elementQueue: {
        parent: Entity<AbsoluteLocation.AbsoluteLocation & TreeNode.TreeNode>;
        element: Entity<AbsoluteLocation.AbsoluteLocation & TreeNode.TreeNode>;
      }[] = [];

      for (const child of rootEntity.components.treeNode.children) {
        if (!isInnerTreeNode(child)) {
          continue;
        }

        elementQueue.push({
          parent: rootEntity,
          element: child
        });
      }

      while (elementQueue.length > 0) {
        const { parent, element } = elementQueue.shift()!;

        if (
          HexagonLocation.entityHasHexagonLocation(element) &&
          HexagonLayout.entityHasHexagonLayout(parent)
        ) {
          const hexagonCenter = hexagonGrid.layout.coordinatesToScreen({
            layout: parent.components.hexagonLayout.layout,
            coordinates: element.components.hexagonLocation.hexagon
          });

          element.components.absoluteLocation.vector = vector2d.createVector2d({
            x: hexagonCenter.x + parent.components.absoluteLocation.vector.x,
            y: hexagonCenter.y + parent.components.absoluteLocation.vector.y
          });
        } else if (
          Location.entityHasLocation(element)
        ) {
          element.components.absoluteLocation.vector =
            vector2d.add(element.components.location.vector, parent.components.absoluteLocation.vector);
        } else {
          element.components.absoluteLocation.vector = parent.components.absoluteLocation.vector;
        }

        for (const child of element.components.treeNode.children) {
          if (
            !AbsoluteLocation.entityHasAbsoluteLocation(child) ||
            !TreeNode.entityHasTreeNode(child)
          ) {
            continue;
          }

          elementQueue.push({
            parent: element,
            element: child
          });
        }
      }
    }
  };
};

export {
  resolveAbsoluteLocationsFactory
};
