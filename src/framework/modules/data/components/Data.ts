import { Entity } from '../../../ecs/Entity.js';

interface Data<TData> {
  data: TData;
}

const createData = function <TData>({ data }: {
  data: TData;
}): Data<TData> {
  return {
    data
  };
};

const entityHasData = function (entity: Entity<any>): entity is Entity<any> {
  return 'data' in entity.components;
};

export type {
  Data
};
export {
  createData,
  entityHasData
};
