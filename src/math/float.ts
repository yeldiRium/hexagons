const equal = (a: number, b: number): boolean => (a - b) < 1e-6;

const zero = (a: number): boolean => equal(a, 0);

export {
  equal,
  zero
};
