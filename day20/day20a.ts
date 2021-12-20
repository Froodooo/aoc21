type dimensions = { minX: number; minY: number; maxX: number; maxY: number };

const input = await Deno.readTextFile("./day20/day20_ex.txt");

const squareDelta = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function getSquareNumber([x, y]: number[], lightPixels: Set<string>) {
  return parseInt(
    squareDelta.reduce((binary, [dx, dy]) => {
      const [xx, yy] = [x + dx, y + dy];

      binary.push(lightPixels.has(`${xx},${yy}`) ? 1 : 0);
      return binary;
    }, []).join(""),
    2,
  );
}

function getDimensions(lightPixels: Set<string>): dimensions {
  const inputImage = Array.from(lightPixels).map((point) =>
    point.split(",").map(Number)
  );

  const minX = inputImage.reduce((max, [x]) => Math.min(max, x), 0);
  const minY = inputImage.reduce((max, [, y]) => Math.min(max, y), 0);
  const maxX = inputImage.reduce((max, [x]) => Math.max(max, x), 0);
  const maxY = inputImage.reduce((max, [, y]) => Math.max(max, y), 0);

  return { minX, minY, maxX, maxY };
}

function increaseDimensions(
  { minX: minX, minY: minY, maxX: maxX, maxY: maxY }: dimensions,
): dimensions {
  return { minX: minX - 1, minY: minY - 1, maxX: maxX + 1, maxY: maxY + 1 };
}

function readLightPixels([_, section]: string[]): Set<string> {
  const lightPixels = new Set<string>();

  const pixelLines = section.split("\n");
  for (let y = 0; y < pixelLines.length; y++) {
    const pixels = pixelLines[y].split("");
    for (let x = 0; x < pixels.length; x++) {
      if (pixels[x] === "#") {
        lightPixels.add(`${x},${y}`);
      }
    }
  }

  return lightPixels;
}

function readImageEnhancementAlgorithm([section, _]: string[]): string[] {
  return section.split("");
}

function enhance(
  lightPixels: Set<string>,
  algorithm: string[],
  dimensions: dimensions,
): Set<string> {
  const { minX, minY, maxX, maxY } = dimensions;

  const newLightPixels = new Set<string>();

  for (let y = minY - 1; y <= maxY + 1; y++) {
    for (let x = minX - 1; x <= maxX + 1; x++) {
      const squareNumber = getSquareNumber([x, y], lightPixels);
      if (algorithm[squareNumber] === "#") {
        newLightPixels.add(`${x},${y}`);
      }
    }
  }

  return newLightPixels;
}

function solve(input: string): number {
  const sections = input.split("\n\n");

  const imageEnhancementAlgorithm = readImageEnhancementAlgorithm(sections);
  let lightPixels = readLightPixels(sections);

  let dimensions = getDimensions(lightPixels);

  for (let i = 0; i < 2; i++) {
    const emptyPixel = imageEnhancementAlgorithm[
      i % 2 === 0 ? 0 : imageEnhancementAlgorithm.length - 1
    ];
    lightPixels = enhance(
      new Set(Array.from(lightPixels)),
      imageEnhancementAlgorithm,
      dimensions,
    );

    // console.log(lightPixels)
    console.log(lightPixels.size);

    const { minX, minY, maxX, maxY } = dimensions;
    for (let y = minY - 2; y <= maxY + 2; y++) {
      for (let x = minX - 2; x <= maxX + 2; x++) {
        if (
          (x < minX - 1 || x > maxX + 1 || y < minY - 1 || y > maxY + 1) &&
          emptyPixel === "#"
        ) {
          lightPixels.add(`${x},${y}`);
        }
      }
    }

    dimensions = increaseDimensions(dimensions);
    console.log();
  }

  // return 5179;
  return 42;
}

solve(input);
