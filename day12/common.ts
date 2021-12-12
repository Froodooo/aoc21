export class Path {
  lastVisited: string;
  smallCaves: Set<string>;
  twiceVisited: boolean;

  constructor(
    lastVisited: string,
    smallCaves: Set<string>,
    twiceVisited: boolean = false,
  ) {
    this.lastVisited = lastVisited;
    this.twiceVisited = twiceVisited;
    this.smallCaves = smallCaves;
  }
}

export function isLowerCase(str: string) {
  if (str === "end") return false;
  return str == str.toLowerCase() && str != str.toUpperCase();
}

export function readGraph(input: string): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();

  input.split("\n").forEach((vertex) => {
    const [start, end] = vertex.split("-");

    const currentEnd = graph.get(start);
    const currentStart = graph.get(end);

    if (end !== "start") {
      if (currentEnd) {
        currentEnd.add(end);
        graph.set(start, currentEnd);
      } else {
        graph.set(start, new Set<string>().add(end));
      }
    }

    if (start !== "start") {
      if (currentStart) {
        currentStart.add(start);
        graph.set(end, currentStart);
      } else {
        graph.set(end, new Set<string>().add(start));
      }
    }
  });

  graph.delete("end");

  return graph;
}
