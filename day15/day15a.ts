import { BinaryHeap } from "https://deno.land/x/collections@v0.10.2/binary_heap.ts";

type queueElement = { risk: number; coordinate: Coordinate };

const input = await Deno.readTextFile("./day15/day15.txt");
class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isVisited(visited: Set<string>) {
    return visited.has(`${this.x},${this.y}`);
  }

  isInCave(cave: number[][]) {
    return this.x >= 0 && this.y >= 0 && this.x < cave[0].length &&
      this.y < cave.length;
  }

  isStart() {
    return this.x === 0 && this.y === 0;
  }

  isFinish(cave: number[][]): boolean {
    return this.x === cave[0].length - 1 && this.y === cave.length - 1;
  }
}

const directions = [
  new Coordinate(-1, 0),
  new Coordinate(0, -1),
  new Coordinate(1, 0),
  new Coordinate(0, 1),
];

function findLowestRisk(
  start: Coordinate,
  cave: number[][],
): number {
  const visited = new Set<string>();
  visited.add(`${start.x},${start.y}`);

  const queue = new BinaryHeap<queueElement>((
    a: queueElement,
    b: queueElement,
  ) => a.risk - b.risk);
  queue.push({ risk: 0, coordinate: start });

  while (!queue.isEmpty()) {
    const { risk: risk, coordinate: coordinate } = queue.pop()!;

    if (coordinate.isFinish(cave)) {
      return risk;
    }

    for (const direction of directions) {
      const neighbourCoordinate = new Coordinate(
        coordinate.x + direction.x,
        coordinate.y + direction.y,
      );
      if (
        neighbourCoordinate.isInCave(cave) &&
        !neighbourCoordinate.isVisited(visited)
      ) {
        queue.push({
          risk: risk + cave[neighbourCoordinate.y][neighbourCoordinate.x],
          coordinate: neighbourCoordinate,
        });
        visited.add(`${neighbourCoordinate.x},${neighbourCoordinate.y}`);
      }
    }
  }

  return -1;
}

function readCave(input: string): number[][] {
  return input.split("\n").map((line) =>
    line.split("").map((position) => +position)
  );
}

export function solve(input: string): number {
  const cave = readCave(input);
  const start = new Coordinate(0, 0);
  const lowestRisk = findLowestRisk(start, cave);

  return lowestRisk;
}

console.log(solve(input));
