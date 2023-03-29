import { Entity } from '../../../ecs/Entity.js';
import has from 'lodash/has';

interface Data<TData> {
  data: {
    data: TData;
  };
}

const createData = function <TData>({ data }: {
  data: TData;
}): Data<TData> {
  return {
    data: {
      data
    }
  };
};

const entityHasData = function (entity: Entity<any>): entity is Entity<any> {
  return has(entity.components, 'data.data');
};

export type {
  Data
};
export {
  createData,
  entityHasData
};
