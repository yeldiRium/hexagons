import { messaging } from '../../../framework/modules';

const gameScored = messaging.messageCreator.messageCreator<'GameScored', { overallScore: number }>(
  'GameScored'
);

export {
  gameScored
};
