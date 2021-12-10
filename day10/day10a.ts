const input = await Deno.readTextFile("./day10/day10.txt");

const openCharacters = ["(", "[", "{", "<"];

function getCloseCharacter(character: string): string {
  switch (character) {
    case "(":
      return ")";
    case "[":
      return "]";
    case "{":
      return "}";
    case "<":
      return ">";
    default:
      return "";
  }
}

function readChunk(
  line: string[],
  closeCharacters: string[],
): string {
  const restLine = line.splice(1);
  const [currentCharacter] = line;

  if (openCharacters.includes(currentCharacter)) {
    closeCharacters.push(getCloseCharacter(currentCharacter));
    return readChunk(restLine, closeCharacters);
  }

  const closeCharacter = closeCharacters.pop();
  if (currentCharacter === closeCharacter) {
    return readChunk(restLine, closeCharacters);
  } else {
    return currentCharacter;
  }
}

function calculatePoints(character: string): number {
  switch (character) {
    case ")":
      return 3;
    case "]":
      return 57;
    case "}":
      return 1197;
    case ">":
      return 25137;
    default:
      return 0;
  }
}

export function solve(input: string): number {
  const lines = input.split("\n").map((line) => line.split(""));

  const invalidCharacters = lines.map((line) => readChunk(line, []));
  const points = invalidCharacters.reduce(
    (total, character) => total + calculatePoints(character),
    0,
  );

  return points;
}

console.log(solve(input));
