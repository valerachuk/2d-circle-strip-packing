import { StripPackingState } from "../strip-packing";
import { StripPackingInput } from "../types";
import { getBestStates } from "./utils";

type BeamSearchDef = {
  beamWidth: number;
};

export class StripPackingBeamSearch {
  constructor(private readonly _def: BeamSearchDef) {}

  public solve(stripPackingInput: StripPackingInput): StripPackingState {
    const startingSolution = new StripPackingState(stripPackingInput);
    startingSolution.placeNext(0);

    return this.solveUsingStartingNode(startingSolution);
  }

  public solveUsingStartingNode(
    startingSolution: StripPackingState
  ): StripPackingState {
    let solutions: Array<StripPackingState> = [startingSolution];
    while (true) {
      const nextLevelSolutions: Array<StripPackingState> = [];
      for (const parentSolutions of solutions) {
        const descendants = this._offspring(parentSolutions);
        nextLevelSolutions.push(...descendants);
      }

      const placementsLeft = nextLevelSolutions[0].pendingPlacementsCount();
      console.log({ beamWidth: this._def.beamWidth, placementsLeft });

      if (nextLevelSolutions[0].isCompleted()) {
        return getBestStates(nextLevelSolutions, 1)[0];
      }

      solutions = getBestStates(nextLevelSolutions, this._def.beamWidth);
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
}
