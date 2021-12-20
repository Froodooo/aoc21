import {
  enhance,
  getDimensions,
  readImageEnhancementAlgorithm,
  readLightPixels,
  updateDimensions,
} from "./common.ts";

const input = await Deno.readTextFile("./day20/day20.txt");

export function solve(input: string, enhancements: number): number {
  const sections = input.split("\n\n");

  const imageEnhancementAlgorithm = readImageEnhancementAlgorithm(sections);
  let lightPixels = readLightPixels(sections);

  let dimensions = getDimensions(lightPixels);

  for (let i = 0; i < enhancements; i++) {
    lightPixels = enhance(
      new Set(Array.from(lightPixels)),
      imageEnhancementAlgorithm,
      dimensions,
    );

    dimensions = updateDimensions(dimensions);
  }

  return lightPixels.size;
}

console.log(solve(input, 50));
