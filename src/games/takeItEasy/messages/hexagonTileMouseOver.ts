import { hexagonGrid } from '../../../framework/math';
import { messaging } from '../../../framework/modules';

const hexagonTileMouseOver = messaging.messageCreator.messageCreator<'HexagonTileMouseOver', { hexagon: hexagonGrid.hexagon.Hexagon }>(
  'HexagonTileMouseOver'
);

export {
  hexagonTileMouseOver
};
