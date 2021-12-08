import { Digit } from "./digit.ts";

const input = await Deno.readTextFile("./day8/day8.txt");

function findZero(
  signalPatterns: string[],
  sixDigit: Digit,
  nineDigit: Digit,
): Digit {
  const pattern =
    signalPatterns.find((pattern) =>
      pattern !== sixDigit.segments.join("") &&
      pattern !== nineDigit.segments.join("")
    )?.split("") ?? [];
  return new Digit(0, pattern);
}

function findTwo(
  signalPatterns: string[],
  threeDigit: Digit,
  fiveDigit: Digit,
): Digit {
  const pattern =
    signalPatterns.find((pattern) =>
      pattern !== threeDigit.segments.join("") &&
      pattern !== fiveDigit.segments.join("")
    )?.split("") ?? [];
  return new Digit(2, pattern);
}

function findThree(signalPatterns: string[], oneDigit: Digit): Digit {
  const pattern =
    signalPatterns.find((pattern) =>
      oneDigit.segments.every((segment) => pattern.includes(segment))
    )?.split("") ?? [];
  return new Digit(3, pattern);
}

function findFive(signalPatterns: string[], sixDigit: Digit): Digit {
  const pattern = signalPatterns.find((pattern) => {
    const countResult = sixDigit.segments.reduce((count, segment) => {
      return pattern.includes(segment) ? count + 1 : count;
    }, 0);

    return countResult === 5;
  })?.split("") ?? [];

  return new Digit(5, pattern);
}

function findSix(signalPatterns: string[], sevenDigit: Digit): Digit {
  const pattern =
    signalPatterns.find((pattern) =>
      !(pattern.includes(sevenDigit.segments[0]) &&
        pattern.includes(sevenDigit.segments[1]) &&
        pattern.includes(sevenDigit.segments[2]))
    )?.split("") ?? [];

  return new Digit(6, pattern);
}

function findNine(signalPatterns: string[], fourDigit: Digit): Digit {
  const pattern =
    signalPatterns.find((pattern) =>
      pattern.includes(fourDigit.segments[0]) &&
      pattern.includes(fourDigit.segments[1]) &&
      pattern.includes(fourDigit.segments[2]) &&
      pattern.includes(fourDigit.segments[3])
    )?.split("") ?? [];

  return new Digit(9, pattern);
}

function findFiveSegmentDigits(
  signalPatterns: string[],
  simpleDigits: Digit[],
  sixDigit: Digit,
): Digit[] {
  const segments = signalPatterns.filter((pattern) => pattern.length == 5);

  const three = findThree(
    segments,
    simpleDigits.filter((digit) => digit.value == 1)[0],
  );
  const five = findFive(segments, sixDigit);
  const two = findTwo(segments, three, five);

  return [two, three, five];
}

function findSixSegmentDigits(
  signalPatterns: string[],
  simpleDigits: Digit[],
): Digit[] {
  const segments = signalPatterns.filter((pattern) => pattern.length == 6);

  const six = findSix(
    segments,
    simpleDigits.filter((digit) => digit.value == 7)[0],
  );
  const nine = findNine(
    segments,
    simpleDigits.filter((digit) => digit.value == 4)[0],
  );
  const zero = findZero(segments, six, nine);

  return [zero, six, nine];
}

function getSimpleDigits(signalPatterns: string[]): Digit[] {
  const simpleDigitsLengths = [2, 4, 3, 7];
  const [one, four, seven, eight] = simpleDigitsLengths.map((digit) =>
    signalPatterns.find((pattern) => pattern.length == digit)?.split("") ?? []
  );

  return [
    new Digit(1, one),
    new Digit(4, four),
    new Digit(7, seven),
    new Digit(8, eight),
  ];
}

function equal(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) return false;
  if (array1 === array2) return true;

  for (let i = 0; i < array1.length; i++) {
    if (array2.indexOf(array1[i]) === -1) return false;
  }

  return true;
}

function getOutputNumber(outputValues: string[][], digits: Digit[]): number {
  const outputNumber = outputValues.map((value) => {
    const digit = digits.find((digit) => equal(digit.segments, value));
    return digit ? digit.value : "?";
  }).join("");

  return parseInt(outputNumber);
}

function outputValueNumber(entry: string[][]): number {
  const [signalPatterns, outputValue] = entry;

  const simpleDigits = getSimpleDigits(signalPatterns);

  const sixSegmentDigits = findSixSegmentDigits(signalPatterns, simpleDigits);
  const fiveSegmentDigits = findFiveSegmentDigits(
    signalPatterns,
    simpleDigits,
    sixSegmentDigits.filter((digit) => digit.value == 6)[0],
  );

  const allDigits = simpleDigits.concat(fiveSegmentDigits).concat(
    sixSegmentDigits,
  );

  return getOutputNumber(
    outputValue.map((value) => value.split("")),
    allDigits,
  );
}

export function solve(input: string): number {
  const lines = input.split("\n");
  const entries = lines.map((line) =>
    line.split(" | ").map((chunk) => chunk.split(" "))
  );
  const numbers = entries.map((entry) => outputValueNumber(entry));

  return numbers.reduce((total, number) => total + number, 0);
}

console.log(solve(input));
