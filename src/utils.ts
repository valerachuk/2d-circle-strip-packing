export const getMinBySelector = <T>(
  arr: ReadonlyArray<T>,
  numberSelector: (t: T) => number
): T =>
  arr.reduce((acc, current) =>
    numberSelector(current) < numberSelector(acc) ? current : acc
  );
