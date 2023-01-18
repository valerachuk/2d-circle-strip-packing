import { StripPackingState } from "../strip-packing";
import { StripPackingInput } from "../types";
import { sortBySelector } from "../utils";
import { StripPackingBeamSearch } from "./beam-search";
import { getBestStates } from "./utils";

export class StripPackingSeparateBeamSearch {
  public solve(stripPackingInput: StripPackingInput): StripPackingState {
    const startingSolution = new StripPackingState(stripPackingInput);
    startingSolution.placeNext(0);

    const separateBeamRoots = this._getSeparateBeamRoots(startingSolution);

    const bestResultBySeparateBeam: Array<StripPackingState> = [];
    for (let i = 0; i < separateBeamRoots.length; i++) {
      const separateBeamRoot = separateBeamRoots[i];

      const beamSearch = new StripPackingBeamSearch({
        beamWidth: i + 1,
      });

      const beamSearchResult =
        beamSearch.solveUsingStartingNode(separateBeamRoot);
      bestResultBySeparateBeam.push(beamSearchResult);
    }

    return getBestStates(bestResultBySeparateBeam, 1)[0];
  }

  private _getSeparateBeamRoots(
    level1Node: StripPackingState
  ): Array<StripPackingState> {
    const descendantsWithMldpDistances: Array<{
      state: StripPackingState;
      mldpDistance: number;
    }> = [];

    for (let i = 0; i < level1Node.pendingPlacementsCount(); i++) {
      const child = new StripPackingState(level1Node);
      const mldpDistance = child.placeNext(i);
      descendantsWithMldpDistances.push({
        state: child,
        mldpDistance,
      });
    }

    const sortedByMldpDistances = sortBySelector(
      descendantsWithMldpDistances,
      ({ mldpDistance }) => mldpDistance
    );

    return sortedByMldpDistances.map(({ state }) => state);
  }
}
