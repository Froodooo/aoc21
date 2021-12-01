// import { fetchInputData, writeInputData } from "../utilities.ts";
import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

function countIncreases(measurements: number[]): number {
  let increases = 0;

  for (let i = 1; i < measurements.length; i++) {
    const lowerMeasurement = measurements[i - 1];
    const higherMeasurement = measurements[i];

    increases = higherMeasurement > lowerMeasurement
      ? increases + 1
      : increases;
  }

  return increases;
}

const testInput = await Deno.readTextFile("./day1.txt");
const measurements = testInput.split("\n").map((measurement) =>
  parseInt(measurement)
);
const increases = countIncreases(measurements);
console.log(increases);

Deno.test("Example 1", async () => {
  const testInput = await Deno.readTextFile("./day1_ex.txt");
  assertEquals(
    countIncreases(
      testInput.split("\n").map((measurement) => parseInt(measurement)),
    ),
    7,
  );
});

Deno.test("Day 1a", async () => {
  const testInput = await Deno.readTextFile("./day1.txt");
  assertEquals(
    countIncreases(
      testInput.split("\n").map((measurement) => parseInt(measurement)),
    ),
    1482,
  );
});
