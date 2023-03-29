import { hexagonGrid } from '../../../framework/math';
import { messaging } from '../../../framework/modules';

const hexagonTileMouseOut = messaging.messageCreator.messageCreator<'HexagonTileMouseOut', { hexagon: hexagonGrid.hexagon.Hexagon }>(
  'HexagonTileMouseOut'
);

export {
  hexagonTileMouseOut
};
