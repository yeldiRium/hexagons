const sumNumbers = function ({ numbers }: {
  numbers: number[];
}): number {
  return numbers.reduce((acc, next) => acc + next, 0);
};

export {
  sumNumbers
};
