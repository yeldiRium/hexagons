import { HexagonGameChip } from '../archetypes';
import { hexagonGrid, random } from '../../../framework/math';

type FirstValue = 1 | 5 | 9;
const firstValues: FirstValue[] = [ 1, 5, 9 ];

type SecondValue = 2 | 6 | 7;
const secondValues: SecondValue[] = [ 2, 6, 7 ];

type ThirdValue = 3 | 4 | 8;
const thirdValues: ThirdValue[] = [ 3, 4, 8 ];

interface GameChip {
  firstValue: FirstValue;
  secondValue: SecondValue;
  thirdValue: ThirdValue;
}

const generateChipStack = function ({ chipLocation }: {
  chipLocation: hexagonGrid.hexagon.Hexagon;
}): HexagonGameChip.HexagonGameChipsArchetype[] {
  const gameChips: HexagonGameChip.HexagonGameChipsArchetype[] = [];

  for (const firstValue of firstValues) {
    for (const secondValue of secondValues) {
      for (const thirdValue of thirdValues) {
        const chip = HexagonGameChip.createHexagonGameChipEntity({
          hexagon: chipLocation,
          gameChip: {
            firstValue,
            secondValue,
            thirdValue
          }
        });

        gameChips.push(chip);
      }
    }
  }

  return random.randomizeArray(gameChips);
};

export type {
  FirstValue,
  SecondValue,
  ThirdValue,
  GameChip
};
export {
  generateChipStack
};
