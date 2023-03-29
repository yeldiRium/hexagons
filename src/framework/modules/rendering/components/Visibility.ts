import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface Visibility {
  rendering: {
    visibility: {
      isVisible: boolean;
    };
  };
}

const createVisibility = function (nitialIsVisible: boolean): Visibility {
  let mIsVisible = nitialIsVisible;

  return {
    rendering: {
      visibility: {
        get isVisible (): boolean {
          return mIsVisible;
        },
        set isVisible (newIsVisible: boolean) {
          mIsVisible = newIsVisible;
        }
      }
    }
  };
};

const entityHasVisibility = function (entity: Entity<any>): entity is Entity<Visibility> {
  return has(entity.components, 'rendering.visibility');
};

export type {
  Visibility
};
export {
  createVisibility,
  entityHasVisibility
};
