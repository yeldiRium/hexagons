import { gameFactory } from './games/takeItEasy/gameFactory.js';

window.addEventListener('DOMContentLoaded', (): void => {
  const canvasElement = document.getElementById('game') as HTMLCanvasElement;
  const game = gameFactory();

  game.run({
    canvas: canvasElement
  });
});
