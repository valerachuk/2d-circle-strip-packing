import { StripPackingState } from "./strip-packing";
import { StripPackingInput } from "./types";
import { getMinIndexBySelector } from "./utils";

type BeamSearchDef = {
  beamWidth: number;
};

export class StripPackingBeamSearch {
  constructor(private readonly _def: BeamSearchDef) {}

  public solve(stripPackingInput: StripPackingInput): StripPackingState {
    const startingSolution = new StripPackingState(stripPackingInput);
    startingSolution.placeNext(0);

    let solutions: Array<StripPackingState> = [startingSolution];
    while (true) {
      const nextLevelSolutions: Array<StripPackingState> = [];
      for (const parentSolutions of solutions) {
        const descendants = this._offspring(parentSolutions);
        nextLevelSolutions.push(...descendants);
      }

      if (nextLevelSolutions[0].isCompleted()) {
        return this._getBestStates(nextLevelSolutions, 1)[0];
      }

      solutions = this._getBestStates(nextLevelSolutions, this._def.beamWidth);
    }
  }

  private _offspring(parentState: StripPackingState): Array<StripPackingState> {
    const descendants: Array<StripPackingState> = [];

    for (let i = 0; i < parentState.pendingPlacementsCount(); i++) {
      const child = new StripPackingState(parentState);
      child.placeNext(i);
      descendants.push(child);
    }

    return descendants;
  }

  private _getBestStates(
    states: ReadonlyArray<StripPackingState>,
    numberOfBestStates: number
  ): Array<StripPackingState> {
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

      const { state: currentBestState } = statesWithLength.splice(
        minIndex,
        1
      )[0];
      bestStates.push(currentBestState);
    }

    return bestStates;
  }
}
