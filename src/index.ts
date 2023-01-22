import { StripPackingBeamSearch } from "./algorithms/beam-search";
import { sy565, sy1, sy12, sy13, sy23, sy123 } from "./benchmarks";
import { emptyDir, writeFile } from "fs-extra";
import { OUTPUT_DIR } from "./constants";
import path from "path";
import { saveVisualization } from "./visualizer";
import { StripPackingSeparateBeamSearch } from "./algorithms/separate-beam-search";

(async () => {
  // const beamSearch = new StripPackingBeamSearch({
  //   beamWidth: 1000,
  // });

  const beamSearch = new StripPackingSeparateBeamSearch();

  const benchmark = sy123;
  const resultState = beamSearch.solve(benchmark);
  const output = resultState.getOutput();

  const outputJson = JSON.stringify(output, null, 2);
  console.log(outputJson);

  await emptyDir(OUTPUT_DIR);
  const outputJsonPath = path.resolve(OUTPUT_DIR, "result.json");
  await writeFile(outputJsonPath, outputJson);

  await saveVisualization({
    stripPackingOutput: output,
    stripWidth: benchmark.stripWidth,
  });
})();
