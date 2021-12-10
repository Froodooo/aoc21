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

function readIncompleteChunk(
  line: string[],
  closeCharacters: string[],
): string[] {
  const restLine = line.splice(1);
  const [currentCharacter] = line;

  if (openCharacters.includes(currentCharacter)) {
    closeCharacters.push(getCloseCharacter(currentCharacter));
    return readIncompleteChunk(restLine, closeCharacters);
  }

  const closeCharacter = closeCharacters.pop();
  if (currentCharacter === closeCharacter) {
    return readIncompleteChunk(restLine, closeCharacters);
  } else {
    if (closeCharacter) closeCharacters.reverse().unshift(closeCharacter)
    return closeCharacters;
  }
}

function calculatePoints(character: string): number {
  switch (character) {
    case ")":
      return 1;
    case "]":
      return 2;
    case "}":
      return 3;
    case ">":
      return 4;
    default:
      return 0;
  }
}

export function solve(input: string): number {
  const lines = input.split("\n").map((line) => line.split(""));

  const incompleteLines = lines.filter((line) => readChunk([...line], []) === undefined);
  const closeCharacterLines = incompleteLines.map((line) => readIncompleteChunk(line, []));
  const points = closeCharacterLines.map((closeCharacters => closeCharacters.reduce((total, character) => total * 5 + calculatePoints(character), 0))).sort((a, b) => a - b);
  const middleScore = points[Math.floor(points.length / 2)];

  return middleScore;
}

console.log(solve(input));
