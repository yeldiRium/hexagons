import { EntityManager } from '../../../framework/ecs/EntityManager.js';
import { color, hexagonGrid, physics2d } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';
import { HexagonGrid, HexagonTile, TextBox, Viewport } from '.';
import { layout, messaging, rendering, spawning } from '../../../framework/modules';
import * as messages from '../messages';

type StateMachineComponents =
  & messaging.components.OnMessage.OnMessage
  & messaging.components.SendMessage.SendMessage
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange
  & spawning.components.Spawn.Spawn;
type StateMachineArchetype = Entity<StateMachineComponents>;

enum State {
  Menu = 'Menu',
  Playing = 'Playing',
  Scoring = 'Scoring'
}
type ChangeStateFunction = (parameters: { state: State }) => void;

interface StateHandler {
  initializeState: (parameters: { stateMachineEntity: StateMachineArchetype; changeState: ChangeStateFunction }) => void;
  teardownState: (parameters: { stateMachineEntity: StateMachineArchetype }) => void;
}

const createStateMachineEntity = function ({ entityManager, canvas, context, rootEntityName }: {
  entityManager: EntityManager;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  rootEntityName: string;
}): StateMachineArchetype {
  const stateHandlers: Record<State, StateHandler> = {
    /* eslint-disable no-param-reassign */
    [State.Menu]: {
      initializeState ({ stateMachineEntity, changeState }) {
        console.log('initialize menu');
        const viewPort: Viewport.ViewportArchetype = entityManager.getEntityByName(rootEntityName).unwrapOrThrow();
        const startButtonEntity = TextBox.createTextBoxEntity({
          context,
          text: 'Start game',
          vector: physics2d.vector2d.zero
        });


        startButtonEntity.name = 'startButton';
        startButtonEntity.components.onClick = (): void => {
          changeState({ state: State.Playing });
        };
        startButtonEntity.components.onMouseOver = (): void => {
          startButtonEntity.components.strokeColor.color = color.predefined.black;
          canvas.style.cursor = 'pointer';
        };
        startButtonEntity.components.onMouseOut = (): void => {
          startButtonEntity.components.strokeColor.color = color.predefined.transparent;
          canvas.style.cursor = 'auto';
        };
        stateMachineEntity.components.spawn.spawnEntity({
          entity: startButtonEntity,
          parent: viewPort
        });
        stateMachineEntity.components.onCanvasSizeChange = ({ newSize }): void => {
          const boundingRect = physics2d.polygon2d.getBoundingRect({ polygon: startButtonEntity.components.polygon.polygon });
          const xywh = physics2d.rect2d.toXYWH({ rect: boundingRect });

          startButtonEntity.components.location.vector = physics2d.vector2d.sub(
            physics2d.vector2d.mul(newSize, 0.5),
            physics2d.vector2d.createVector2d({ x: xywh.width / 2, y: xywh.height / 2 })
          );
        };
      },
      teardownState ({ stateMachineEntity }) {
        console.log('teardown menu');
        const startButton: TextBox.TextBoxArchetype = entityManager.getEntityByName('startButton').unwrapOrThrow();

        startButton.components.despawn.despawn();
        stateMachineEntity.components.onCanvasSizeChange = (): void => {
          // Remove the previous handler.
        };
      }
    },
    [State.Playing]: {
      initializeState ({ stateMachineEntity, changeState }) {
        console.log('initialize playing');
        const viewportEntity: Viewport.ViewportArchetype = entityManager.getEntityByName(rootEntityName).unwrapOrThrow();
        const hexagonGridEntity = HexagonGrid.createHexagonGridEntity({
          orientation: hexagonGrid.orientation.pointyOrientation,
          vector: physics2d.vector2d.zero,
          size: physics2d.vector2d.zero
        });

        for (const hexagon of hexagonGrid.patterns.createRegularHexagon({ hexagonSize: 5 })) {
          const hexagonTileEntity = HexagonTile.createHexagonTileEntity({ hexagon });

          layout.attachChildToParent({ child: hexagonTileEntity, parent: hexagonGridEntity });
        }

        console.log({ hexagonGridEntity });

        stateMachineEntity.components.spawn.spawnEntity({
          entity: hexagonGridEntity,
          parent: viewportEntity
        });
        stateMachineEntity.components.onCanvasSizeChange = ({ newSize }): void => {
          const { x: width, y: height } = newSize;

          hexagonGridEntity.components.hexagonLayout.layout.size = physics2d.vector2d.createVector2d({ x: height / 20, y: height / 20 });
          hexagonGridEntity.components.location.vector = physics2d.vector2d.createVector2d({ x: width / 2, y: height / 2 });
        };
        const canvasRect = canvas.getBoundingClientRect();
        const canvasSize = physics2d.vector2d.createVector2d({ x: canvasRect.width, y: canvasRect.height });

        stateMachineEntity.components.onCanvasSizeChange({ newSize: canvasSize });
      },
      teardownState ({ stateMachineEntity }) {
        stateMachineEntity.components.onCanvasSizeChange = (): void => {
          // Remove the previous handler.
        };
        console.log('teardown playing');
      }
    },
    [State.Scoring]: {
      initializeState () {
        console.log('initialize scoring');
      },
      teardownState () {
        console.log('teardown scoring');
      }
    }
    /* eslint-enable no-param-reassign */
  };

  const stateMachineEntity = createEntity<StateMachineComponents>({
    components: {
      ...messaging.components.OnMessage.createOnMessage(),
      ...messaging.components.SendMessage.createSendMessage(),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          // This will be set later.
        }
      }),
      ...spawning.components.Spawn.createSpawn()
    }
  });

  // Debugging message bus
  stateMachineEntity.components.onMessage.addMessageListener({
    type: '*',
    callback ({ message }) {
      console.log(`message: ${message.type}`, { payload: message.payload });
    }
  });

  let currentState: State | undefined;
  const changeState = ({ state: newState }: {
    state: State;
  }): void => {
    if (currentState !== undefined) {
      stateHandlers[currentState].teardownState({ stateMachineEntity });
    }
    stateHandlers[newState].initializeState({ stateMachineEntity, changeState });
    stateMachineEntity.components.sendMessage.sendMessage({
      message: messages.gameStateChanged({ newState })
    });
    currentState = newState;
  };

  changeState({ state: State.Menu });

  return stateMachineEntity;
};

export type {
  StateMachineArchetype
};
export {
  createStateMachineEntity
};
