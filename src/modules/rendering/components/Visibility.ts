import { Entity } from '../../../ecs/Entity.js';

interface Visibility {
  visibility: {
    isVisible: boolean;
  };
}

const createVisibility = function (nitialIsVisible: boolean): Visibility {
  let mIsVisible = nitialIsVisible;

  return {
    visibility: {
      get isVisible (): boolean {
        return mIsVisible;
      },
      set isVisible (newIsVisible: boolean) {
        mIsVisible = newIsVisible;
      }
    }
  };
};

const entityHasVisibility = function (entity: Entity<any>): entity is Entity<Visibility> {
  return 'visibility' in entity.components;
};

export type {
  Visibility
};
export {
  createVisibility,
  entityHasVisibility
};
