import { Entity } from '../../ecs/Entity.js';
import { hexagonGrid } from '../../math';
import { HexagonLayout, HexagonLocation, TreeNode } from './components';

const findHexagonEntitiesAtCoordinates = function ({ hexagonLayout, coordinates }: {
  hexagonLayout: Entity<HexagonLayout.HexagonLayout & TreeNode.TreeNode>;
  coordinates: hexagonGrid.hexagon.Hexagon;
}): Set<Entity<HexagonLocation.HexagonLocation & TreeNode.TreeNode>> {
  const foundEntities = new Set<Entity<HexagonLocation.HexagonLocation & TreeNode.TreeNode>>();

  for (const child of hexagonLayout.components.treeNode.children) {
    if (
      !HexagonLocation.entityHasHexagonLocation(child) ||
      !TreeNode.entityHasTreeNode(child)
    ) {
      continue;
    }

    if (hexagonGrid.hexagon.equal(coordinates, child.components.hexagonLocation.hexagon)) {
      foundEntities.add(child);
    }
  }

  return foundEntities;
};

export {
  findHexagonEntitiesAtCoordinates
};
