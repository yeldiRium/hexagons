import { createHexagon, Hexagon } from './Hexagon.js';

const createRegularHexagon = function ({ hexagonSize }: {
  hexagonSize: number;
}): Hexagon[] {
  const hexagons: Hexagon[] = [];

  const gridSize = hexagonSize;
  const gridMiddle = Math.floor(gridSize / 2);

  for (let i = 0; i < gridSize; i++) {
    const distanceToMiddle = Math.abs(gridMiddle - i);
    const tilesInRow = gridSize - distanceToMiddle;
    const rowStart = i < gridMiddle ? gridSize - tilesInRow : 0;
    const rowEnd = i <= gridMiddle ? gridSize - 1 : gridSize - distanceToMiddle - 1;

    for (let j = rowStart; j <= rowEnd; j++) {
      hexagons.push(createHexagon({ q: j - gridMiddle, r: i - gridMiddle }));
    }
  }

  return hexagons;
};

export {
  createRegularHexagon
};
