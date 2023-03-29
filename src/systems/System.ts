import { Entity } from '../Entity.js';

type System<TComponents> = (parameters: {
  entities: Entity<TComponents>[];
  entityIndex: Map<string, Entity<any>>;
}) => void;

export type {
  System
};
