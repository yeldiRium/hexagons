import { Entity } from '../../../ecs/Entity.js';

interface Scale {
  scale: {
    scale: number;
  };
}

const createScale = function ({ scale: initialScale }: {
  scale: number;
}): Scale {
  return {
    scale: {
      scale: initialScale
    }
  };
};

const entityHasScale = function (entity: Entity<any>): entity is Entity<Scale> {
  return 'scale' in entity.components;
};

export type {
  Scale
};
export {
  createScale,
  entityHasScale
};
