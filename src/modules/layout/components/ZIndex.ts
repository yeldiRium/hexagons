/* eslint-disable @typescript-eslint/naming-convention */
import { Entity } from '../../../ecs/Entity.js';

interface ZIndex {
  zIndex: {
    zIndex: number;
  };
}

const createZIndex = function (initialZIndex = 0): ZIndex {
  let mZIndex = initialZIndex;

  return {
    zIndex: {
      get zIndex (): number {
        return mZIndex;
      },
      set zIndex (newZIndex: number) {
        mZIndex = newZIndex;
      }
    }
  };
};

const entityHasZIndex = function (entity: Entity<any>): entity is Entity<ZIndex> {
  return 'zIndex' in entity.components;
};

export type {
  ZIndex
};
export {
  createZIndex,
  entityHasZIndex
};
/* eslint-enable @typescript-eslint/naming-convention */
