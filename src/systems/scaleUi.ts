import { point } from '../rendering';
import { System } from '../engine/System.js';
import { Viewport } from '../components';

const scaleUiFactory = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  return ({ entityManager }): void => {
    const viewport = entityManager.getEntityByName<Viewport.Viewport>('viewport').unwrapOrThrow();

    /* eslint-disable no-param-reassign */
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    viewport.components.viewport.layout.size = point.createPoint({ x: height / 20, y: height / 20 });
    viewport.components.viewport.layout.origin = point.createPoint({ x: width / 2, y: height / 2 });
    /* eslint-enable no-param-reassign */
  };
};

export {
  scaleUiFactory
};
