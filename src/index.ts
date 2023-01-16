import { StripPackingBeamSearch } from "./beam-search";
import { sy1 } from "./benchmarks";

const beamSearch = new StripPackingBeamSearch({
  beamWidth: 3,
});

const resultState = beamSearch.solve(sy1);
