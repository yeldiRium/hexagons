import { EntityManager } from '../../../framework/ecs/EntityManager.js';
import { color, hexagonGrid, physics2d } from '../../../framework/math';
import { createEntity, Entity } from '../../../framework/ecs/Entity.js';
import { gameChip, scoring } from '../gameLogic';
import { HexagonBackgroundTile, HexagonGrid, HexagonScoreChip, TextHexagon, Viewport } from '.';
import { messaging, rendering, spawning, stateMachine } from '../../../framework/modules';
import * as messages from '../messages';

type State = 'Menu' | 'Playing' | 'Scoring';
type StateMachineComponents =
  & messaging.components.OnMessage.OnMessage
  & messaging.components.SendMessage.SendMessage
  & rendering.components.OnCanvasSizeChange.OnCanvasSizeChange
  & spawning.components.Spawn.Spawn
  & stateMachine.components.StateMachine.StateMachine<State, StateMachineArchetype>;
type StateMachineArchetype = Entity<StateMachineComponents>;

const gameGridSize = 5;
const gameGridEntityName = 'gameGrid';
const startButtonEntityName = 'startButton';
const scoreTextEntityName = 'scoreTextBox';
const playAgainButtonEntityName = 'playAgainButton';

const clearGameGrid = function ({ hexagonGridEntity }: {
  hexagonGridEntity: HexagonGrid.HexagonGridArchetype;
}): void {
  for (const child of hexagonGridEntity.components.treeNode.children) {
    if (spawning.components.Despawn.entityHasDespawn(child)) {
      child.components.despawn.despawn();
    }
  }
};

const createStateMachineEntity = function ({ entityManager, canvas, rootEntityName }: {
  entityManager: EntityManager;
  canvas: HTMLCanvasElement;
  rootEntityName: string;
}): StateMachineArchetype {
  const stateMachineEntity = createEntity<StateMachineComponents>({
    kind: 'StateMachine',
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
              const viewportEntity: Viewport.ViewportArchetype = entityManager.getEntityByName(rootEntityName).unwrapOrThrow();
              const hexagonGridEntity = HexagonGrid.createHexagonGridEntity({
                orientation: hexagonGrid.orientation.flatOrientation,
                vector: physics2d.vector2d.zero,
                size: physics2d.vector2d.zero
              });

              hexagonGridEntity.name = gameGridEntityName;
              stateMachineEntity.components.spawn.spawnEntity({
                entity: hexagonGridEntity,
                parent: viewportEntity
              });
              stateMachineEntity.components.onCanvasSizeChange = ({ newSize }): void => {
                const { x: width, y: height } = newSize;

                hexagonGridEntity.components.hexagonLayout.layout.size = physics2d.vector2d.createVector2d({ x: height / 20, y: height / 20 });
                hexagonGridEntity.components.location.vector = physics2d.vector2d.createVector2d({ x: width / 2, y: height / 2 });
              };

              const startButtonEntity = TextHexagon.createTextHexagonEntity({
                location: hexagonGrid.hexagon.createHexagon({ q: 0, r: 0 }),
                text: {
                  text: 'Start game',
                  align: 'center'
                },
                textSizeMultiplier: 0.5
              });

              startButtonEntity.name = startButtonEntityName;
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
                parent: hexagonGridEntity
              });
            },
            teardownState () {
              const hexagonGridEntity: HexagonGrid.HexagonGridArchetype = entityManager.getEntityByName(gameGridEntityName).unwrapOrThrow();

              clearGameGrid({ hexagonGridEntity });
            }
          },
          Playing: {
            initializeState ({ stateMachineEntity, changeState }) {
              const hexagonGridEntity: HexagonGrid.HexagonGridArchetype = entityManager.getEntityByName(gameGridEntityName).unwrapOrThrow();

              for (const hexagon of hexagonGrid.patterns.createRegularHexagon({ hexagonSize: gameGridSize })) {
                const backgroundTileEntity = HexagonBackgroundTile.createHexagonBackgroundTileEntity({ hexagon });

                stateMachineEntity.components.spawn.spawnEntity({
                  entity: backgroundTileEntity,
                  parent: hexagonGridEntity
                });
              }

              const chipStack = gameChip.generateChipStack({
                chipLocation: hexagonGrid.hexagon.createHexagon({ q: -4, r: 2 })
              });
              let nextChip = chipStack.pop()!;

              stateMachineEntity.components.spawn.spawnEntity({
                entity: nextChip,
                parent: hexagonGridEntity
              });

              stateMachineEntity.components.onMessage.addMessageListener<messaging.messageCreator.MessageInCreator<typeof messages.hexagonBackgroundTileClicked>>({
                type: messages.hexagonBackgroundTileClicked.type,
                callback ({ message }): void {
                  const backgroundTile = message.payload.hexagonBackgroundTile;

                  nextChip.components.hexagonLocation.hexagon = hexagonGrid.hexagon.clone(backgroundTile.components.hexagonLocation.hexagon);

                  // Move the hexagon out of the way, so that the check for the game ending condition does not stumble
                  // across it. This is necessary, because the despawning happens after this callback has completed.
                  backgroundTile.components.hexagonLocation.hexagon = hexagonGrid.hexagon.createHexagon({
                    q: -100,
                    r: -100
                  });
                  backgroundTile.components.despawn.despawn();

                  const isGameFinished = scoring.isGameFinished({ hexagonGridEntity, gameGridSize });

                  if (isGameFinished) {
                    changeState({ state: 'Scoring' });

                    return;
                  }

                  nextChip = chipStack.pop()!;

                  stateMachineEntity.components.spawn.spawnEntity({
                    entity: nextChip,
                    parent: hexagonGridEntity
                  });
                }
              });
            },
            teardownState ({ stateMachineEntity }) {
              stateMachineEntity.components.onMessage.removeMessageListener({
                type: messages.hexagonBackgroundTileClicked.type
              });
            }
          },
          Scoring: {
            initializeState ({ changeState }) {
              const hexagonGridEntity: HexagonGrid.HexagonGridArchetype = entityManager.getEntityByName(gameGridEntityName).unwrapOrThrow();

              const scoreResult = scoring.evaluateScore({
                hexagonGridEntity
              }).unwrapOrThrow();

              for (const lineScore of scoreResult.lineScores) {
                const lineScoreChipEntity = HexagonScoreChip.createHexagonScoreChip({
                  hexagon: lineScore.displayLocation,
                  orientation: hexagonGrid.hexagon.oppositeDirection(lineScore.direction),
                  score: lineScore.score
                });

                stateMachineEntity.components.spawn.spawnEntity({
                  entity: lineScoreChipEntity,
                  parent: hexagonGridEntity
                });
              }

              const scoreTextEntity = TextHexagon.createTextHexagonEntity({
                location: hexagonGrid.hexagon.createHexagon({ q: 0, r: -4 }),
                text: {
                  text: `Score: ${scoreResult.overallScore}`,
                  align: 'center',
                  bold: true
                },
                textSizeMultiplier: 0.4
              });

              scoreTextEntity.name = scoreTextEntityName;
              stateMachineEntity.components.spawn.spawnEntity({
                entity: scoreTextEntity,
                parent: hexagonGridEntity
              });

              stateMachineEntity.components.sendMessage.sendMessage({
                message: messages.gameScored({ overallScore: scoreResult.overallScore })
              });

              const playAgainButtonEntity = TextHexagon.createTextHexagonEntity({
                location: hexagonGrid.hexagon.createHexagon({ q: 0, r: -3 }),
                text: {
                  text: 'Play again',
                  align: 'center'
                },
                textSizeMultiplier: 0.5
              });

              playAgainButtonEntity.name = playAgainButtonEntityName;
              playAgainButtonEntity.components.onClick = (): void => {
                changeState({ state: 'Playing' });
              };
              playAgainButtonEntity.components.onMouseOver = (): void => {
                playAgainButtonEntity.components.strokeColor.color = color.predefined.black;
                canvas.style.cursor = 'pointer';
              };
              playAgainButtonEntity.components.onMouseOut = (): void => {
                playAgainButtonEntity.components.strokeColor.color = color.predefined.transparent;
                canvas.style.cursor = 'auto';
              };
              stateMachineEntity.components.spawn.spawnEntity({
                entity: playAgainButtonEntity,
                parent: hexagonGridEntity
              });
            },
            teardownState () {
              const hexagonGridEntity: HexagonGrid.HexagonGridArchetype = entityManager.getEntityByName(gameGridEntityName).unwrapOrThrow();

              clearGameGrid({ hexagonGridEntity });
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
