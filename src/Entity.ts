import { v4 as uuidv4 } from 'uuid';

interface Entity<TComponents extends Record<string, any>> {
  id: string;
  components: TComponents;
}

const createEntity = function <TComponents>({ components }: { components: TComponents }): Entity<TComponents> {
  return {
    id: uuidv4(),
    components
  };
};

export type {
  Entity
};

export {
  createEntity
};
