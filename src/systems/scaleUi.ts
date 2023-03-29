import { Entity } from '../Entity.js';
import { point } from '../rendering';
import { System } from './System.js';
import { Viewport } from '../components';

const scaleUiFactory = function ({ viewport, canvas }: {
  viewport: Entity<Viewport.Viewport>;
  canvas: HTMLCanvasElement;
}): System<Entity<any>> {
  return (): void => {
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
