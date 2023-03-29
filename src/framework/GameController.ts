import { Engine } from './ecs/Engine.js';

interface RunParameters {
  canvas: HTMLCanvasElement;
}
interface InitializeEngineParameters {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}
interface TickParameters {
  engine: Engine;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  dt: number;
}
interface FrameParameters {
  engine: Engine;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  lastTime: number;
  currentTime: number;
}
type StopFunction = () => void;

interface GameController {
  isRunning: () => boolean;
  run: (parameters: RunParameters) => StopFunction;
}

const gameControllerFactory = function ({ initializeEngine, tick }: {
  initializeEngine: (parameters: InitializeEngineParameters) => Engine;
  tick: (parameters: TickParameters) => void;
}): GameController {
  let isStopped = false;
  const isRunning = (): boolean => !isStopped;

  const stop = (): void => {
    isStopped = true;
  };

  const frame = ({ engine, canvas, context, lastTime, currentTime }: FrameParameters): void => {
    if (isStopped) {
      return;
    }

    const dt = currentTime - lastTime;

    tick({ engine, canvas, context, dt });

    window.requestAnimationFrame(time => {
      frame({ engine, canvas, context, lastTime: currentTime, currentTime: time });
    });
  };

  const run = ({ canvas }: {
    canvas: HTMLCanvasElement;
  }): StopFunction => {
    const context = canvas.getContext('2d');

    if (context === null) {
      throw new Error('Failed to get the 2d rendering context.');
    }

    window.requestAnimationFrame(time => {
      const engine = initializeEngine({ canvas, context });

      frame({ engine, canvas, context, lastTime: time, currentTime: time });
    });

    return stop;
  };

  return {
    isRunning,
    run
  };
};

export type {
  RunParameters,
  InitializeEngineParameters,
  TickParameters,
  GameController
};
export {
  gameControllerFactory
};
