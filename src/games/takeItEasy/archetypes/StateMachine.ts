import { EntityManager } from '../../../framework/ecs/EntityManager.js';
import { gameChip } from '../gameLogic';
import { color, hexagonGrid, physics2d } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';
import { HexagonBackgroundTile, HexagonGameChip, HexagonGrid, TextBox, Viewport } from '.';
import { layout, messaging, rendering, spawning, stateMachine } from '../../../framework/modules';
import * as messages from '../messages';

type State = 'Menu' | 'Playing' | 'Scoring';
type StateMachineComponents =
  & messaging.components.OnMessage.OnMessage
  & messaging.components.SendMessage.SendMessage
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange
  & spawning.components.Spawn.Spawn
  & stateMachine.components.StateMachine.StateMachine<State, StateMachineArchetype>;
type StateMachineArchetype = Entity<StateMachineComponents>;

const createStateMachineEntity = function ({ entityManager, canvas, context, rootEntityName }: {
  entityManager: EntityManager;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  rootEntityName: string;
}): StateMachineArchetype {
  const stateMachineEntity = createEntity<StateMachineComponents>({
    components: {
      ...messaging.components.OnMessage.createOnMessage(),
      ...messaging.components.SendMessage.createSendMessage(),
      ...rendering.components.OnCanvasSizeChange.createOnCanvasSizeChange({
        onCanvasSizeChange () {
          // This will be set later.
        }
      }),
      ...spawning.components.Spawn.createSpawn(),
      ...stateMachine.components.StateMachine.createStateMachine<State, StateMachineArchetype>({
        initialState: 'Menu',
        stateHandlers: {
          /* eslint-disable @typescript-eslint/no-shadow, no-param-reassign */
          Menu: {
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
                changeState({ state: 'Playing' });
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
          Playing: {
            initializeState ({ stateMachineEntity, changeState }) {
              console.log('initialize playing');
              const viewportEntity: Viewport.ViewportArchetype = entityManager.getEntityByName(rootEntityName).unwrapOrThrow();
              const hexagonGridEntity = HexagonGrid.createHexagonGridEntity({
                orientation: hexagonGrid.orientation.pointyOrientation,
                vector: physics2d.vector2d.zero,
                size: physics2d.vector2d.zero
              });

              for (const hexagon of hexagonGrid.patterns.createRegularHexagon({ hexagonSize: 5 })) {
                const backgroundTileEntity = HexagonBackgroundTile.createHexagonBackgroundTileEntity({ hexagon });

                layout.attachChildToParent({ child: backgroundTileEntity, parent: hexagonGridEntity });
              }

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

              const chipStack = gameChip.generateChipStack();
              let nextChip = chipStack.pop()!;

              stateMachineEntity.components.spawn.spawnEntity({
                entity: nextChip,
                parent: hexagonGridEntity
              });

              stateMachineEntity.components.onMessage.addMessageListener<messaging.messageCreator.MessageInCreator<typeof messages.hexagonBackgroundTileClicked>>({
                type: messages.hexagonBackgroundTileClicked.type,
                callback ({ message }): void {
                  const backgroundTile = message.payload.hexagonBackgroundTile;

                  backgroundTile.components.despawn.despawn();
                  nextChip.components.hexagonLocation.hexagon = hexagonGrid.hexagon.clone(backgroundTile.components.hexagonLocation.hexagon);

                  nextChip = chipStack.pop()!;

                  stateMachineEntity.components.spawn.spawnEntity({
                    entity: nextChip,
                    parent: hexagonGridEntity
                  });
                }
              });
            },
            teardownState ({ stateMachineEntity }) {
              console.log('teardown playing');
              stateMachineEntity.components.onCanvasSizeChange = (): void => {
                // Remove the previous handler.
              };
            }
          },
          Scoring: {
            initializeState () {
              console.log('initialize scoring');
            },
            teardownState () {
              console.log('teardown scoring');
            }
          }
          /* eslint-enable @typescript-eslint/no-shadow, no-param-reassign */
        }
      })
    }
  });

  // Debugging message bus
  stateMachineEntity.components.onMessage.addMessageListener({
    type: '*',
    callback ({ message }) {
      console.log(`message: ${message.type}`, { payload: message.payload });
    }
  });

  return stateMachineEntity;
};

export type {
  StateMachineArchetype
};
export {
  createStateMachineEntity
};
