const input = await Deno.readTextFile("./day8/day8.txt");

class Digit {
  value: number;
  segments: string[];
  digitLength: number;

  constructor(value: number, segments: string[]) {
    this.value = value;
    this.segments = segments;
    this.digitLength = segments.length;
  }

  updateSegments(segments: string[]) {
    this.segments = segments;
  }
}

function findZero(
  signalPatterns: string[],
  sixDigit: Digit,
  nineDigit: Digit,
): Digit {
  const pattern = signalPatterns.filter((pattern) =>
    pattern !== sixDigit.segments.join("") &&
    pattern !== nineDigit.segments.join("")
  )[0].split("");
  return new Digit(0, pattern);
}

function findTwo(
  signalPatterns: string[],
  threeDigit: Digit,
  fiveDigit: Digit,
): Digit {
  const pattern = signalPatterns.filter((pattern) =>
    pattern !== threeDigit.segments.join("") &&
    pattern !== fiveDigit.segments.join("")
  )[0].split("");
  return new Digit(2, pattern);
}

function findThree(signalPatterns: string[], oneDigit: Digit): Digit {
  const pattern = signalPatterns.filter((pattern) =>
    pattern.includes(oneDigit.segments[0]) &&
    pattern.includes(oneDigit.segments[1])
  )[0].split("");
  return new Digit(3, pattern);
}

function findFive(signalPatterns: string[], sixDigit: Digit): Digit {
  const pattern = signalPatterns.filter((pattern) => {
    const countResult = sixDigit.segments.reduce((count, segment) => {
      return pattern.includes(segment) ? count + 1 : count;
    }, 0);

    return countResult === 5;
  })[0].split("");

  return new Digit(5, pattern);
  // const frequencies = segmentFrequencies(
  //   signalPatterns.reduce((all, segment) => all + segment, ""),
  // );
  // const [uniqueSegment, _] = frequencies.filter(([_, count]) => count === 1)[0];
  // const pattern = signalPatterns.filter((pattern) =>
  //   pattern.includes(uniqueSegment)
  // )[0].split("");
  // return new Digit(5, pattern);
}

function findSix(signalPatterns: string[], sevenDigit: Digit): Digit {
  const pattern = signalPatterns.filter((pattern) =>
    !(pattern.includes(sevenDigit.segments[0]) &&
      pattern.includes(sevenDigit.segments[1]) &&
      pattern.includes(sevenDigit.segments[2]))
  )[0].split("");

  return new Digit(6, pattern);
}

function findNine(signalPatterns: string[], fourDigit: Digit): Digit {
  const pattern = signalPatterns.filter((pattern) =>
    pattern.includes(fourDigit.segments[0]) &&
    pattern.includes(fourDigit.segments[1]) &&
    pattern.includes(fourDigit.segments[2]) &&
    pattern.includes(fourDigit.segments[3])
  )[0].split("");

  return new Digit(9, pattern);
}

// 2 3 5
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

// 0 6 9
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
  const one = (signalPatterns.find((pattern) => pattern.length == 2) ?? "")
    .split("");
  const four = (signalPatterns.find((pattern) => pattern.length == 4) ?? "")
    .split("");
  const seven = (signalPatterns.find((pattern) => pattern.length == 3) ?? "")
    .split("");
  const eight = (signalPatterns.find((pattern) => pattern.length == 7) ?? "")
    .split("");

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

  const output = outputValue.map((value) => value.split("")).map((value) => {
    const digit = allDigits.find((digit) => equal(digit.segments, value));
    return digit ? digit.value : "?";
  }).join("");

  return parseInt(output);
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
