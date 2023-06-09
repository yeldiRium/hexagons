import { StateMachine } from '../components';
import { System } from '../../../ecs/System.js';

const initializeStateMachinesFactory = function (): System {
  return {
    tick ({ entityManager, isFirstTick }): void {
      for (const stateMachineEntity of entityManager.getEntities(
        StateMachine.entityHasStateMachine
      )) {
        if (!isFirstTick) {
          return;
        }

        const changeState = ({ state: newState }: { state: string }): void => {
          const currentState = stateMachineEntity.components.stateMachine.stateMachine.currentState;

          stateMachineEntity.components.stateMachine.stateMachine.stateHandlers[currentState].teardownState({ stateMachineEntity });
          stateMachineEntity.components.stateMachine.stateMachine.stateHandlers[newState].initializeState({ stateMachineEntity, changeState });
          stateMachineEntity.components.stateMachine.stateMachine.currentState = newState;
        };

        const currentState = stateMachineEntity.components.stateMachine.stateMachine.currentState;

        stateMachineEntity.components.stateMachine.stateMachine.stateHandlers[currentState].initializeState({
          stateMachineEntity,
          changeState
        });
      }
    }
  };
};

export {
  initializeStateMachinesFactory
};
