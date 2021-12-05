const input = await Deno.readTextFile("./day5/day5.txt");

const paths = input.split("\n");
const visitedPoints = paths.reduce((visitedPoints, path: string) => {
  const [[x1, y1], [x2, y2]] = path.split(" -> ").map((point) =>
    point.split(",").map((part) => parseInt(part))
  );
  if (x1 != x2 && y1 != y2) return visitedPoints;

  if (x1 == x2) {
    const min = Math.min(y1, y2);
    const max = Math.max(y1, y2);
    for (let i = min; i <= max; i++) {
      const overlaps = visitedPoints.get(`${x1},${i}`) ?? 0;
      visitedPoints.set(`${x1},${i}`, overlaps + 1);
    }
  }

  if (y1 == y2) {
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    for (let i = min; i <= max; i++) {
      const overlaps = visitedPoints.get(`${i},${y1}`) ?? 0;
      visitedPoints.set(`${i},${y1}`, overlaps + 1);
    }
  }

  return visitedPoints;
}, new Map<string, number>());

const multipleOverlaps =
  [...visitedPoints.values()].filter((point) => point > 1).length;

console.log(multipleOverlaps);
