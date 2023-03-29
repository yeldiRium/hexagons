import { HexagonGrid } from '../components';
import { point } from '../../../math';
import { System } from '../../../ecs/System.js';

const scaleHexagonGrid = function ({ canvas }: {
  canvas: HTMLCanvasElement;
}): System {
  return {
    tick ({ entityManager }): void {
      const viewport = entityManager.getEntityByName<HexagonGrid.HexagonGrid>('hexagonGrid').unwrapOrThrow();

      /* eslint-disable no-param-reassign */
      const { width, height } = canvas.getBoundingClientRect();

      canvas.width = width;
      canvas.height = height;

      viewport.components.hexagonGrid.layout.size = point.createPoint({ x: height / 20, y: height / 20 });
      viewport.components.hexagonGrid.layout.origin = point.createPoint({ x: width / 2, y: height / 2 });
      /* eslint-enable no-param-reassign */
    }
  };
};

export {
  scaleHexagonGrid
};
