import { Entity } from '../../ecs/Entity.js';
import { TreeNode } from './components';

const attachChildToParent = function ({ child, parent }: {
  child: Entity<TreeNode.TreeNode>;
  parent: Entity<TreeNode.TreeNode>;
}): void {
  /* eslint-disable no-param-reassign */
  child.components.layout.treeNode.parent = parent;
  parent.components.layout.treeNode.children.add(child);
  /* eslint-enable no-param-reassign */
};

export {
  attachChildToParent
};
