const input = await Deno.readTextFile("./day15/day15.txt");

class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const directions = [
  new Coordinate(-1, 0),
  new Coordinate(0, -1),
  new Coordinate(1, 0),
  new Coordinate(0, 1),
];

function isVisited(position: Coordinate, visited: Set<string>) {
  return visited.has(`${position.x},${position.y}`);
}

function isInCave(position: Coordinate, cave: number[][]) {
  return position.x >= 0 && position.y >= 0 && position.x < cave[0].length &&
    position.y < cave.length;
}

function isStart(position: Coordinate) {
  return position.x === 0 && position.y === 0;
}

function isFinish(position: Coordinate, cave: number[][]): boolean {
  return position.x === cave[0].length - 1 && position.y === cave.length - 1;
}

function findPath(
  position: Coordinate,
  cave: number[][],
  cost: number[][],
  visited: Set<string>,
): number {
  if (!isInCave(position, cave) || isVisited(position, visited)) {
    return Infinity;
  }

  if (isFinish(position, cave)) {
    return cave[position.y][position.x];
  }

  if (cost[position.y][position.x] > 0) {
    return cost[position.y][position.x];
  }

  visited.add(`${position.x},${position.y}`);

  const options: number[] = [];
  for (let direction of directions) {
    const newPosition = new Coordinate(
      position.x + direction.x,
      position.y + direction.y,
    );
    options.push(findPath(newPosition, cave, cost, visited));
  }

  cost[position.y][position.x] = Math.min(...options) +
    cave[position.y][position.x];

  return cost[position.y][position.x];
}

function readCave(input: string): number[][] {
  return input.split("\n").map((line) =>
    line.split("").map((position) => +position)
  );
}

function solve(input: string): number {
  const cave = readCave(input);
  const start = new Coordinate(0, 0);
  const cost = Array(cave.length).fill(0).map(() =>
    Array(cave[0].length).fill(0)
  );
  const lowestRisk = findPath(start, cave, cost, new Set<string>());

  return lowestRisk;
}

console.log(solve(input));
