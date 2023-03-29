import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface TreeNode {
  layout: {
    treeNode: {
      parent: Entity<TreeNode> | undefined;
      children: Set<Entity<TreeNode>>;
    };
  };
}

const createTreeNode = function ({ parent: initialParent }: {
  parent?: Entity<TreeNode>;
} = {}): TreeNode {
  let mParent = initialParent;
  const mChildren = new Set<Entity<TreeNode>>();

  return {
    layout: {
      treeNode: {
        get parent (): Entity<TreeNode> | undefined {
          return mParent;
        },
        set parent (newParent: Entity<TreeNode> | undefined) {
          mParent = newParent;
        },
        get children (): Set<Entity<TreeNode>> {
          return mChildren;
        }
      }
    }
  };
};

const entityHasTreeNode = function (entity: Entity<any>): entity is Entity<TreeNode> {
  return has(entity.components, 'layout.treeNode');
};

export type {
  TreeNode
};
export {
  createTreeNode,
  entityHasTreeNode
};
