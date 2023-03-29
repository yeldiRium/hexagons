import { v4 as uuidv4 } from 'uuid';

interface Entity<TComponents extends Record<string, any>> {
  id: string;
  kind: string;
  name?: string;
  components: TComponents;
}

const createEntity = function <TComponents>({ kind, components }: { kind: string; components: TComponents }): Entity<TComponents> {
  return {
    id: uuidv4(),
    kind,
    components
  };
};

export type {
  Entity
};

export {
  createEntity
};
