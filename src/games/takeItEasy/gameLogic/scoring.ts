import { Entity } from '../../../framework/ecs/Entity.js';
import { layout } from '../../../framework/modules';
import { defekt, error, Result, value } from 'defekt';
import { HexagonGameChip, HexagonGrid } from '../archetypes';
import { hexagonGrid, misc } from '../../../framework/math';

class GameIsNotFinishedYet extends defekt({ code: 'GameIsNotFinishedYet' }) {}

const isGameFinished = function ({ hexagonGridEntity, gameGridSize }: {
  hexagonGridEntity: HexagonGrid.HexagonGridArchetype;
  gameGridSize: number;
}): boolean {
  const allTilesFilledWithChips = hexagonGrid.patterns.createRegularHexagon({ hexagonSize: gameGridSize }).every((hexagon): boolean => {
    const backgroundTileOrGameChip: Entity<any> = layout.findHexagonEntitiesAtCoordinates({
      hexagonLayout: hexagonGridEntity,
      coordinates: hexagon
    }).values().next().value;

    return backgroundTileOrGameChip.kind === HexagonGameChip.kind;
  });

  return allTilesFilledWithChips;
};

interface ScoringLine {
  start: hexagonGrid.hexagon.Hexagon;
  direction: hexagonGrid.hexagon.Direction;
  length: number;
  whichValue: 'firstValue' | 'secondValue' | 'thirdValue';
}
const scoringLines: ScoringLine[] = [
  // Scoring lines from top to bottom
  {
    start: hexagonGrid.hexagon.createHexagon({ q: -2, r: 0 }),
    direction: 5,
    length: 3,
    whichValue: 'firstValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: -1, r: -1 }),
    direction: 5,
    length: 4,
    whichValue: 'firstValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 0, r: -2 }),
    direction: 5,
    length: 5,
    whichValue: 'firstValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 1, r: -2 }),
    direction: 5,
    length: 4,
    whichValue: 'firstValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 2, r: -2 }),
    direction: 5,
    length: 3,
    whichValue: 'firstValue'
  },

  // Scoring lines from bottom left to top right
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 0, r: 2 }),
    direction: 1,
    length: 3,
    whichValue: 'secondValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: -1, r: 2 }),
    direction: 1,
    length: 4,
    whichValue: 'secondValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: -2, r: 2 }),
    direction: 1,
    length: 5,
    whichValue: 'secondValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: -2, r: 1 }),
    direction: 1,
    length: 4,
    whichValue: 'secondValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: -2, r: 0 }),
    direction: 1,
    length: 3,
    whichValue: 'secondValue'
  },

  // Scoring lines from bottom right to top left
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 2, r: -2 }),
    direction: 3,
    length: 3,
    whichValue: 'thirdValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 2, r: -1 }),
    direction: 3,
    length: 4,
    whichValue: 'thirdValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 2, r: 0 }),
    direction: 3,
    length: 5,
    whichValue: 'thirdValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 1, r: 1 }),
    direction: 3,
    length: 4,
    whichValue: 'thirdValue'
  },
  {
    start: hexagonGrid.hexagon.createHexagon({ q: 0, r: 2 }),
    direction: 3,
    length: 3,
    whichValue: 'thirdValue'
  }
];

interface LineScore {
  displayLocation: hexagonGrid.hexagon.Hexagon;
  score: number;
}

const evaluateScoringLine = function ({ hexagonGridEntity, scoringLine }: {
  hexagonGridEntity: HexagonGrid.HexagonGridArchetype;
  scoringLine: ScoringLine;
}): Result<LineScore, GameIsNotFinishedYet> {
  const valuesInLine: number[] = [];
  let location = scoringLine.start;

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < scoringLine.length; i++) {
    const hexagonTileEntity: Entity<any> | undefined = layout.findHexagonEntitiesAtCoordinates({
      hexagonLayout: hexagonGridEntity,
      coordinates: location
    }).values().next().value;

    if (hexagonTileEntity === undefined || hexagonTileEntity.kind !== HexagonGameChip.kind) {
      return error(new GameIsNotFinishedYet({ data: { missingHexagonGameChipLocation: location }}));
    }

    const hexagonGameChipEntity: HexagonGameChip.HexagonGameChipsArchetype = hexagonTileEntity;

    valuesInLine.push(hexagonGameChipEntity.components.data[scoringLine.whichValue]);

    location = hexagonGrid.hexagon.neighbor(location, scoringLine.direction);
  }

  const allValuesInLineAreTheSame = valuesInLine.every(iValue => iValue === valuesInLine[0]);
  const score = allValuesInLineAreTheSame ? misc.sumNumbers({ numbers: valuesInLine }) : 0;

  return value({
    score,
    displayLocation: location
  });
};

interface Score {
  lineScores: LineScore[];
  overallScore: number;
}

const evaluateScore = function ({ hexagonGridEntity }: {
  hexagonGridEntity: HexagonGrid.HexagonGridArchetype;
}): Result<Score, GameIsNotFinishedYet> {
  let overallScore = 0;
  const lineScores: LineScore[] = [];

  for (const scoringLine of scoringLines) {
    const scoringLineResult = evaluateScoringLine({
      hexagonGridEntity,
      scoringLine
    });

    if (scoringLineResult.hasError()) {
      return error(scoringLineResult.error);
    }

    overallScore += scoringLineResult.value.score;
    lineScores.push(scoringLineResult.value);
  }

  return value({
    overallScore,
    lineScores
  });
};

export {
  evaluateScore,
  isGameFinished
};
