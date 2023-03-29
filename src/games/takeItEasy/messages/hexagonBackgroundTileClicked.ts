import { HexagonBackgroundTile } from '../archetypes';
import { messaging } from '../../../framework/modules';

const hexagonBackgroundTileClicked = messaging.messageCreator.messageCreator<'HexagonBackgroundTileClicked', { hexagonBackgroundTile: HexagonBackgroundTile.HexagonBackgroundTileArchetype }>(
  'HexagonBackgroundTileClicked'
);

export {
  hexagonBackgroundTileClicked
};
