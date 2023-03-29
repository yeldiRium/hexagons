import { Entity } from '../../ecs/Entity.js';
import { TreeNode } from './components';

const forEachDescendant = function ({ entity, callback }: {
  entity: Entity<TreeNode.TreeNode>;
  callback: (parameters: { entity: Entity<TreeNode.TreeNode> }) => void;
}): void {
  const queue: Entity<TreeNode.TreeNode>[] = [ entity ];

  while (queue.length > 0) {
    const iEntity = queue.shift()!;

    // eslint-disable-next-line callback-return
    callback({ entity: iEntity });

    for (const child of iEntity.components.layout.treeNode.children) {
      queue.push(child);
    }
  }
};

export {
  forEachDescendant
};
