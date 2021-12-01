// import { fetchInputData, writeInputData } from "../utilities.ts";
export function countIncreases(measurements: number[]): number {
  let increases = 0;

  for (let i = 2; i < measurements.length - 1; i++) {
    const lowerWindowMeasurements = measurements[i - 2] + measurements[i - 1] +
      measurements[i];
    const higherWindowMeasurements = measurements[i - 1] + measurements[i] +
      measurements[i + 1];

    increases = higherWindowMeasurements > lowerWindowMeasurements
      ? increases + 1
      : increases;
  }

  return increases;
}

const input = await Deno.readTextFile("./day1/day1.txt");
const measurements = input.split("\n").map((measurement) =>
  parseInt(measurement)
);
const increases = countIncreases(measurements);
console.log(increases);
