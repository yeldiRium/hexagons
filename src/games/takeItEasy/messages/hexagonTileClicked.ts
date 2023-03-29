import { hexagonGrid } from '../../../framework/math';
import { messaging } from '../../../framework/modules';

const hexagonTileClicked = messaging.messageCreator.messageCreator<'HexagonTileClicked', { hexagon: hexagonGrid.hexagon.Hexagon }>(
  'HexagonTileClicked'
);

export {
  hexagonTileClicked
};
