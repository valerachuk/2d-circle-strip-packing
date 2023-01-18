export const getMinBySelector = <T>(
  arr: ReadonlyArray<T>,
  numberSelector: (t: T) => number
): T =>
  arr.reduce((acc, current) =>
    numberSelector(current) < numberSelector(acc) ? current : acc
  );

export const getMinIndexBySelector = <T>(
  arr: ReadonlyArray<T>,
  numberSelector: (t: T) => number
): number => {
  let minIndex = 0;
  let minValue = numberSelector(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    const currentNumberValue = numberSelector(arr[i]);

    if (currentNumberValue < minValue) {
      minValue = currentNumberValue;
      minIndex = i;
    }
  }

  return minIndex;
};

export const sortBySelector = <T>(
  arr: ReadonlyArray<T>,
  numberSelector: (t: T) => number
): Array<T> =>
  arr.concat().sort((a, b) => numberSelector(a) - numberSelector(b));
