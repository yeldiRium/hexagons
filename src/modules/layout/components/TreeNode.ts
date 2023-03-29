import { Entity } from '../../../ecs/Entity.js';

interface TreeNode {
  treeNode: {
    parent: Entity<any> | undefined;
    children: Set<Entity<any>>;
  };
}

const createTreeNode = function ({ parent: initialParent }: {
  parent?: Entity<any>;
} = {}): TreeNode {
  let mParent = initialParent;
  const mChildren = new Set<Entity<any>>();

  return {
    treeNode: {
      get parent (): Entity<any> | undefined {
        return mParent;
      },
      set parent (newParent: Entity<any> | undefined) {
        mParent = newParent;
      },
      get children (): Set<Entity<any>> {
        return mChildren;
      }
    }
  };
};

const entityHasTreeNode = function (entity: Entity<any>): entity is Entity<TreeNode> {
  return 'treeNode' in entity.components;
};

export type {
  TreeNode
};
export {
  createTreeNode,
  entityHasTreeNode
};
