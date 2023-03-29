import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface Scale {
  layout: {
    scale: {
      scale: number;
    };
  };
}

const createScale = function ({ scale: initialScale }: {
  scale: number;
}): Scale {
  return {
    layout: {
      scale: {
        scale: initialScale
      }
    }
  };
};

const entityHasScale = function (entity: Entity<any>): entity is Entity<Scale> {
  return has(entity.components, 'layout.scale');
};

export type {
  Scale
};
export {
  createScale,
  entityHasScale
};
