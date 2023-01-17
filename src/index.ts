import { BeamSearchDef, StripPackingBeamSearch } from "./beam-search";
import { sy565, sy1 } from "./benchmarks";
import { emptyDir, writeFile } from "fs-extra";
import { OUTPUT_DIR } from "./constants";
import path from "path";
import { saveVisualization } from "./visualizer";

(async () => {
  const beamSearchDef: BeamSearchDef = {
    beamWidth: 10,
    // beamWidth: 1000,
    // beamWidth: 5000,
  };
  const beamSearch = new StripPackingBeamSearch(beamSearchDef);

  const resultState = beamSearch.solve(sy1);
  const output = resultState.getOutput();

  const outputJson = JSON.stringify(output, null, 2);
  console.log(outputJson);

  await emptyDir(OUTPUT_DIR);
  const outputJsonPath = path.resolve(OUTPUT_DIR, "result.json");
  await writeFile(outputJsonPath, outputJson);

  await saveVisualization({
    stripPackingOutput: output,
    stripWidth: beamSearchDef.beamWidth,
  });
})();
