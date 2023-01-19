import { StripPackingState } from "../strip-packing";
import { getMinIndexBySelector } from "../utils";

export const getBestStates = (
  states: ReadonlyArray<StripPackingState>,
  numberOfBestStates: number
): Array<StripPackingState> => {
  if (states.length <= numberOfBestStates) {
    return states.concat();
  }

  let statesWithLength = states.map((state) => ({
    state,
    length: state.currentStripLength(),
  }));

  const bestStates: Array<StripPackingState> = [];
  for (let i = 0; i < numberOfBestStates; i++) {
    const minIndex = getMinIndexBySelector(
      statesWithLength,
      ({ length }) => length
    );

    const { state: currentBestState } = statesWithLength.splice(minIndex, 1)[0];
    bestStates.push(currentBestState);
  }

  return bestStates;
};
