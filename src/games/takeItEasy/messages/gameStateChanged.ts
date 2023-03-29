import { messaging } from '../../../framework/modules';

const gameStateChanged = messaging.messageCreator.messageCreator<'GameStateChanged', { newState: string }>(
  'GameStateChanged'
);

export {
  gameStateChanged
};
