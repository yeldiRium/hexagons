import { Entity } from '../../../ecs/Entity.js';
import { System } from '../../../ecs/System.js';
import { vector } from '../../../math';
import { AbsoluteLocation, Location, TreeNode } from '../components';

const isInnerTreeNode = function (entity: Entity<any>): entity is Entity<AbsoluteLocation.AbsoluteLocation & TreeNode.TreeNode & Location.Location> {
  return AbsoluteLocation.entityHasAbsoluteLocation(entity) &&
    TreeNode.entityHasTreeNode(entity) &&
    Location.entityHasLocation(entity);
};

const resolveAbsoluteLocationsSystem = function ({ rootElementName }: {
  rootElementName: string;
}): System {
  return {
    tick ({ entityManager }): void {
      const rootElementResult = entityManager.getEntityByName(rootElementName);

      if (rootElementResult.hasError()) {
        throw new Error('No root element found.');
      }

      const rootElement = rootElementResult.value;

      if (
        !AbsoluteLocation.entityHasAbsoluteLocation(rootElement) ||
        !TreeNode.entityHasTreeNode(rootElement)
      ) {
        throw new Error('Root element does not fulfil requirements. It must have an AbsoluteLocation and a TreeNode.');
      }

      const elementQueue: {
        parent: Entity<AbsoluteLocation.AbsoluteLocation & TreeNode.TreeNode>;
        element: Entity<AbsoluteLocation.AbsoluteLocation & TreeNode.TreeNode & Location.Location>;
      }[] = [];

      for (const child of rootElement.components.treeNode.children) {
        if (!isInnerTreeNode(child)) {
          continue;
        }

        elementQueue.push({
          parent: rootElement,
          element: child
        });
      }

      while (elementQueue.length > 0) {
        const { parent, element } = elementQueue.shift()!;

        element.components.absoluteLocation.vector =
          vector.add(element.components.location.vector, parent.components.absoluteLocation.vector);

        for (const child of element.components.treeNode.children) {
          if (!isInnerTreeNode(child)) {
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
  resolveAbsoluteLocationsSystem
};
