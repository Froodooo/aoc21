const input = await Deno.readTextFile("./day8/day8_ex.txt");

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

const digits: Digit[] = [
  new Digit(0, ["a", "b", "c", "e", "f", "g"]),
  new Digit(1, ["c", "f"]),
  new Digit(2, ["a", "c", "d", "e", "g"]),
  new Digit(3, ["a", "c", "d", "f", "g"]),
  new Digit(4, ["b", "c", "d", "f"]),
  new Digit(5, ["a", "b", "d", "f", "g"]),
  new Digit(6, ["a", "b", "d", "e", "f", "g"]),
  new Digit(7, ["a", "c", "f"]),
  new Digit(8, ["a", "b", "c", "d", "e", "f", "g"]),
  new Digit(9, ["a", "b", "c", "d", "f", "g"]),
];

const simpleDigits = digits.filter((digit) =>
  [1, 4, 7, 8].includes(digit.value)
);

function initialLetterOptions(signalPattern: [[number, string[]]]): [string, string[]] {
  const letterOptions = {};
  for (let i = 0; i < signalPattern.length; i++) {
    const [number, [pattern]] = signalPattern[i];
    const digit = digits.find((digit) => digit.value == number);
    if (digit) {
      pattern.split("").forEach((letter) => {
        letterOptions[letter] = digit.segments;
      });
    }
  }

  return letterOptions;
}

function initialDigitOptions(signalPattern: string[]) {
  return digits.map((digit) => {
    return [digit.value, signalPattern.filter((pattern) => pattern.length == digit.digitLength)];
  });
}

function outputValueNumber(entry: string[][]): number {
  const [signalPattern, outputValue] = entry;

  console.log(initialDigitOptions(signalPattern));
  return 42;
}

export function solve(input: string): number {
  const lines = input.split("\n");
  const entries = lines.map((line) => line.split(" | ").map((chunk) => chunk.split(" ")));
  const numbers = entries.map((entry) => outputValueNumber(entry));
  return 52;
}

solve(input);
// console.log(solve(input));
