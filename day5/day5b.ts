const input = await Deno.readTextFile("./day5/day5.txt");

const paths = input.split("\n");
const visitedPoints = paths.reduce((visitedPoints, path: string) => {
  const [[x1, y1], [x2, y2]] = path.split(" -> ").map((point) =>
    point.split(",").map((part) => parseInt(part))
  );
  // if (x1 != x2 && y1 != y2) return visitedPoints;

  if (x1 == x2) {
    const min = Math.min(y1, y2);
    const max = Math.max(y1, y2);
    for (let i = min; i <= max; i++) {
      const overlaps = visitedPoints.get(`${x1},${i}`) ?? 0;
      visitedPoints.set(`${x1},${i}`, overlaps + 1);
    }
  } else if (y1 == y2) {
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    for (let i = min; i <= max; i++) {
      const overlaps = visitedPoints.get(`${i},${y1}`) ?? 0;
      visitedPoints.set(`${i},${y1}`, overlaps + 1);
    }
  } else {
    const xPoints = range(x1, x2);
    const yPoints = range(y1, y2);
    const difference = Math.abs(x1 - x2) + 1;

    for (let i = 0; i < difference; i++) {
      const overlaps = visitedPoints.get(`${xPoints[i]},${yPoints[i]}`) ?? 0;
      visitedPoints.set(`${xPoints[i]},${yPoints[i]}`, overlaps + 1);
    }
  }

  return visitedPoints;
}, new Map<string, number>());

function range(point1: number, point2: number): number[] {
  const result = [];
  if (point1 > point2) {
    for (let i = point1; i >= point2; i--) {
      result.push(i);
    }
  } else {
    for (let i = point1; i <= point2; i++) {
      result.push(i);
    }
  }

  return result;
}

const multipleOverlaps =
  [...visitedPoints.values()].filter((point) => point > 1).length;

console.log(multipleOverlaps);
