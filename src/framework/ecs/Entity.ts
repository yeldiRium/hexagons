import { v4 as uuidv4 } from 'uuid';
import { IntersectionOf, mergeObjectsDeeply } from '../../utils';

interface Entity<TComponents> {
  id: string;
  kind: string;
  name?: string;
  components: TComponents;
}

const createEntity = function <TComponentParts extends any[]>({ kind, components }: {
  kind: string;
  components: TComponentParts;
}): Entity<IntersectionOf<TComponentParts>> {
  return {
    id: uuidv4(),
    kind,
    components: mergeObjectsDeeply(components)
  };
};

export type {
  Entity
};

export {
  createEntity
};
