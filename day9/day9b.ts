const input = await Deno.readTextFile("./day9/day9_ex.txt");

class Point {
  x: number;
  y: number;
  value: number;

  constructor(x: number, y: number, value: number) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  isSame(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  isLower(point: Point) {
    return this.x < point.x || this.y < point.y;
  }

  isHigher(point: Point) {
    return this.x > point.x || this.y > point.y;
  }

  isOption(point: Point) {
    return Math.abs(this.value - point.value) == 1;
  }

  withinMap(map: number[][]) {
    return this.y < map.length && this.x < map[0].length && this.y >= 0 &&
      this.x >= 0;
  }

  setValue(map: number[][]) {
    this.value = map[this.y][this.x];
  }
}

const neighbours = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

function readMap(input: string): number[][] {
  return input.split("\n").map((row) =>
    row.split("").map((point) => parseInt(point))
  );
}

function inBasin(basin: Point[], point: Point) {
  return basin.some((basinPoint) => basinPoint.isSame(point));
}

function getBasin(
  basin: Point[],
  map: number[][],
  point: Point,
): Point[] {
  basin.push(point);

  for (let i = 0; i < neighbours.length; i++) {
    const neighbour = neighbours[i];

    const neighbourX = point.x + neighbour.x;
    const neighbourY = point.y + neighbour.y;
    const neighbourPoint = new Point(
      neighbourX,
      neighbourY,
      0,
    );

    if (neighbourPoint.withinMap(map)) {
      neighbourPoint.setValue(map);
    } else {
      continue;
    }

    if (map[neighbourPoint.y][neighbourPoint.x] === 9) {
      continue;
    }

    if (
      neighbourPoint.withinMap(map) && neighbourPoint.isOption(point) &&
      !inBasin(basin, neighbourPoint)
    ) {
      basin = getBasin(basin, map, neighbourPoint);
    }
  }

  return basin;
}

function getBasins(map: number[][]): Point[][] {
  const basins = [];

  for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[y].length - 1; x++) {
      if (map[y][x] === 9) {
        continue;
      }

      const point = new Point(x, y, map[y][x]);
      const basin = getBasin([], map, point);
      basins.push(basin);
    }
  }
  return basins;
}

export function solve(input: string): number {
  const map = readMap(input);
  const basins = getBasins(map);
  const sortedBasins = basins.sort((basin1, basin2) => {
    return basin1.length < basin2.length ? 1 : -1;
  });

  sortedBasins.splice(3);
  const multiple = sortedBasins.reduce(
    (total, basin) => total * basin.length,
    1,
  );
  return multiple;
}

console.log(solve(input));
