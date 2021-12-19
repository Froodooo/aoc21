import { permutations } from "https://deno.land/std@0.118.0/collections/mod.ts";

const input = await Deno.readTextFile("./day19/day19_ex.txt");

class Coordinate {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  orientations(): Coordinate[] {
    const rotations = permutations([this.x, this.y, this.z]).map(([x, y, z]) =>
      new Coordinate(x, y, z)
    );
    const facings = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

    const orientations = [];
    for (const rotation of rotations) {
      for (const facing of facings) {
        orientations.push(
          new Coordinate(
            rotation.x * facing[0],
            rotation.y * facing[1],
            rotation.z,
          ),
        );
      }
    }

    return orientations;
  }
}

class Scanner {
  id: number;
  beaconPositions: Coordinate[];

  constructor(id: number, beaconPositions: Coordinate[]) {
    this.id = id;
    this.beaconPositions = beaconPositions;
  }
}

function readScanners(input: string): Scanner[] {
  return input.split("\n\n").map((scanner) => {
    const scannerLines = scanner.split("\n");
    const header = scannerLines.splice(0, 1)[0];
    const id = +header.match(/--- scanner (\d) ---/)![1];
    const coordinates = scannerLines.map((line) => {
      const [x, y, z] = line.split(",");
      return new Coordinate(+x, +y, +z);
    });

    return new Scanner(id, coordinates);
  });
}

function solve(input: string): number {
  const scanners = readScanners(input);

  console.log(scanners[0].beaconPositions[0].orientations().length);
  console.log(permutations(["x", "y", "z"]));
  // console.log(scanners)
  return 42;
}

solve(input);
