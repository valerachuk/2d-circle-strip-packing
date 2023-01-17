import { createCanvas } from "canvas";
import { Circle, StripPackingOutput } from "./types";
import path from "path";
import { OUTPUT_DIR } from "./constants";
import { writeFile } from "fs/promises";

const IMAGE_HEIGHT = 500;

export const saveVisualization = async (params: {
  stripPackingOutput: StripPackingOutput;
  stripWidth: number;
}): Promise<void> => {
  const {
    stripPackingOutput: { stripLength, circles },
    stripWidth,
  } = params;

  const scaleFactor = IMAGE_HEIGHT / stripWidth;

  const canvas = createCanvas(scaleFactor * stripLength, IMAGE_HEIGHT);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();

  ctx.fillStyle = "black";
  const drawCircle = (circle: Circle): void => {
    const {
      radius,
      center: { x, y },
    } = circle;

    const scaledX = x * scaleFactor;
    const scaledY = IMAGE_HEIGHT - y * scaleFactor;
    const scaledRadius = radius * scaleFactor;

    ctx.beginPath();
    ctx.arc(scaledX, scaledY, scaledRadius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  for (const circle of circles) {
    drawCircle(circle);
  }

  const pngStream = canvas.createPNGStream();
  const outputPngPath = path.resolve(OUTPUT_DIR, "result.png");
  await writeFile(outputPngPath, pngStream);
};
