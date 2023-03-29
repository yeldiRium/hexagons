/* eslint-disable @typescript-eslint/naming-convention */
import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface ZIndex {
  layout: {
    zIndex: {
      zIndex: number;
    };
  };
}

const createZIndex = function (initialZIndex = 0): ZIndex {
  let mZIndex = initialZIndex;

  return {
    layout: {
      zIndex: {
        get zIndex (): number {
          return mZIndex;
        },
        set zIndex (newZIndex: number) {
          mZIndex = newZIndex;
        }
      }
    }
  };
};

const entityHasZIndex = function (entity: Entity<any>): entity is Entity<ZIndex> {
  return has(entity.components, 'layout.zIndex');
};

export type {
  ZIndex
};
export {
  createZIndex,
  entityHasZIndex
};
/* eslint-enable @typescript-eslint/naming-convention */
