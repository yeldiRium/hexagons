import { Entity } from '../../ecs/Entity.js';
import { TreeNode } from './components';

const removeChildFromParent = function ({ child }: {
  child: Entity<TreeNode.TreeNode>;
}): void {
  /* eslint-disable no-param-reassign */
  const parent = child.components.layout.treeNode.parent;

  if (parent === undefined) {
    return;
  }

  child.components.layout.treeNode.parent = undefined;
  parent.components.layout.treeNode.children.delete(child);
  /* eslint-enable no-param-reassign */
};

export {
  removeChildFromParent
};
