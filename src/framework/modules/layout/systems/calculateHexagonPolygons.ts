import { Entity } from '../../../ecs/Entity.js';
import { Polygon } from '../../rendering/components';
import { System } from '../../../ecs/System.js';
import { hexagonGrid, physics2d } from '../../../math';
import { HexagonLayout, HexagonLocation, TreeNode } from '../components';

const entityIsHexagonLayoutWithChildren = function (entity: Entity<any>): entity is Entity<TreeNode.TreeNode & HexagonLayout.HexagonLayout> {
  return HexagonLayout.entityHasHexagonLayout(entity) &&
    TreeNode.entityHasTreeNode(entity);
};
const entityIsHexagonLocationWithPolygon = function (entity: Entity<any>): entity is Entity<HexagonLocation.HexagonLocation & Polygon.Polygon> {
  return HexagonLocation.entityHasHexagonLocation(entity) &&
    Polygon.entityHasPolygon(entity);
};

const calculateHexagonPolygonsFactory = function (): System {
  return {
    tick ({ entityManager }): void {
      for (const hexagonLayout of entityManager.getEntities(
        entityIsHexagonLayoutWithChildren
      )) {
        const children = [ ...hexagonLayout.components.treeNode.children.values() ].filter(
          (entity): entity is Entity<TreeNode.TreeNode & HexagonLocation.HexagonLocation & Polygon.Polygon> => entityIsHexagonLocationWithPolygon(entity)
        );

        for (const child of children) {
          child.components.polygon.polygon = physics2d.polygon2d.createPolygon2d({
            points: hexagonGrid.layout.hexagonCornerOffsets({
              layout: hexagonLayout.components.hexagonLayout.layout
            })
          });
        }
      }
    }
  };
};

export {
  calculateHexagonPolygonsFactory
};
