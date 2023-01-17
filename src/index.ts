import { StripPackingBeamSearch } from "./beam-search";
import { sy565, sy1 } from "./benchmarks";
import { emptyDir, writeFile } from "fs-extra";
import { OUTPUT_DIR } from "./constants";
import path from "path";

(async () => {
  const beamSearch = new StripPackingBeamSearch({
    beamWidth: 10,
    // beamWidth: 1000,
    // beamWidth: 5000,
  });

  const resultState = beamSearch.solve(sy565);
  const output = resultState.getOutput();

  const outputJson = JSON.stringify(output, null, 2);
  console.log(outputJson);

  await emptyDir(OUTPUT_DIR);
  const outputJsonPath = path.resolve(OUTPUT_DIR, "result.json");
  await writeFile(outputJsonPath, outputJson);
})();
