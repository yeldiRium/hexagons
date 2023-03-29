import { EntityManager } from './EntityManager';

type System = (parameters: {
  entityManager: EntityManager;
}) => void;

export type {
  System
};
