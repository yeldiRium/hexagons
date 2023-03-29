const randomizeArray = function <TElement = any>(array: TElement[]): TElement[] {
  const newArray = [ ...array ];
  const arrayLength = newArray.length;

  for (let i = 0; i < arrayLength; i++) {
    const randomRemainingElement = Math.floor(Math.random() * (arrayLength - i));
    const temp = newArray[i];

    newArray[i] = newArray[randomRemainingElement];
    newArray[randomRemainingElement] = temp;
  }

  return newArray;
};

export {
  randomizeArray
};
