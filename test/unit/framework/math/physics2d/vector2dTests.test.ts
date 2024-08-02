import * as vector2d from '../../../../../src/framework/math/physics2d/Vector2d.js';

describe('vector2d', (): void => {
  describe('vector2d', (): void => {
    describe('equal', (): void => {
      test('recognizes equal vectors as equal.', async (): Promise<void> => {
        const vectorPairs: [vector2d.Vector2d, vector2d.Vector2d][] = [
          [ vector2d.zero, vector2d.zero ],
          [ vector2d.createVector2d({ x: 15, y: 852.78 }), vector2d.createVector2d({ x: 15, y: 852.78 }) ],
          [ vector2d.createVector2d({ x: Number.MAX_SAFE_INTEGER, y: Math.PI }), vector2d.createVector2d({ x: Number.MAX_SAFE_INTEGER, y: Math.PI }) ]
        ];

        for (const [ vec1, vec2 ] of vectorPairs) {
          expect(vector2d.equal(vec1, vec2)).toBe(true);
        }
      });

      test('recognizes approximately equal vectors as equal.', async (): Promise<void> => {
        const vectorPairs: [vector2d.Vector2d, vector2d.Vector2d][] = [
          [ vector2d.createVector2d({ x: 0, y: 0 }), vector2d.createVector2d({ x: 1e-7, y: 0 }) ]
        ];

        for (const [ vec1, vec2 ] of vectorPairs) {
          expect(vector2d.equal(vec1, vec2)).toBe(true);
        }
      });

      test('recognizes unequal vectors as unequal.', async (): Promise<void> => {
        const vectorPairs: [vector2d.Vector2d, vector2d.Vector2d][] = [
          [ vector2d.createVector2d({ x: 0, y: 0 }), vector2d.createVector2d({ x: 1, y: 1 }) ],
          [ vector2d.createVector2d({ x: 0, y: 0 }), vector2d.createVector2d({ x: 0, y: 1 }) ],
          [ vector2d.createVector2d({ x: 0, y: 0 }), vector2d.createVector2d({ x: 1, y: 0 }) ],
          [ vector2d.createVector2d({ x: 1, y: 1 }), vector2d.createVector2d({ x: 0, y: 0 }) ],
          [ vector2d.createVector2d({ x: 0, y: 1 }), vector2d.createVector2d({ x: 0, y: 0 }) ],
          [ vector2d.createVector2d({ x: 1, y: 0 }), vector2d.createVector2d({ x: 0, y: 0 }) ]
        ];

        for (const [ vec1, vec2 ] of vectorPairs) {
          expect(vector2d.equal(vec1, vec2)).toBe(false);
        }
      });
    });
  });
});
