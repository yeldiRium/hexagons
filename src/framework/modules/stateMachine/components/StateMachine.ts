import { Entity } from '../../../ecs/Entity.js';

type ChangeStateFunction<TState extends string> = (parameters: { state: TState }) => void;
interface StateHandler<TState extends string, TEntity extends Entity<StateMachine<TState, TEntity>> > {
  initializeState: (parameters: { stateMachineEntity: TEntity; changeState: ChangeStateFunction<TState> }) => void;
  teardownState: (parameters: { stateMachineEntity: TEntity }) => void;
}
type StateHandlers<TState extends string, TEntity extends Entity<StateMachine<TState, TEntity>>> = Record<TState, StateHandler<TState, TEntity>>;
interface StateMachine<TState extends string, TEntity extends Entity<StateMachine<TState, TEntity>>> {
  stateMachine: {
    currentState: TState;
    stateHandlers: StateHandlers<TState, TEntity>;
  };
}
type StateMachineState<TStateMachine> = TStateMachine extends StateMachine<infer TState, any> ? TState : never;

const createStateMachine = function <TState extends string, TEntity extends Entity<StateMachine<TState, TEntity>>>({
  initialState,
  stateHandlers
}: {
  initialState: TState;
  stateHandlers: StateHandlers<TState, TEntity>;
}): StateMachine<TState, TEntity> {
  return {
    stateMachine: {
      currentState: initialState,
      stateHandlers
    }
  };
};

const entityHasStateMachine = function (entity: Entity<any>): entity is Entity<StateMachine<any, any>> {
  return 'stateMachine' in entity.components;
};

export type {
  ChangeStateFunction,
  StateHandler,
  StateHandlers,
  StateMachine,
  StateMachineState
};
export {
  createStateMachine,
  entityHasStateMachine
};
