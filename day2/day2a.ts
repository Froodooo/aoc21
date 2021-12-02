export class Movement {
  direction: string;
  value: number;

  constructor(direction: string, value: number) {
    this.direction = direction;
    this.value = value;
  }
}

export class Submarine {
  horizontal_position: number;
  depth: number;

  constructor() {
    this.horizontal_position = 0;
    this.depth = 0;
  }

  move(movement: Movement): void {
    switch (movement.direction) {
      case "forward":
        this.horizontal_position += movement.value;
        break;
      case "up":
        this.depth -= movement.value;
        break;
      case "down":
        this.depth += movement.value;
        break;
      default:
        console.log("Invalid movement direction");
        break;
    }
  }
}

export function readCourse(rawMovements: string[]): Movement[] {
  return rawMovements.map((movement) => {
    const movementList = movement.split(" ");
    return new Movement(movementList[0], parseInt(movementList[1]));
  });
}

const input = await Deno.readTextFile("./day2/day2.txt");
const movements = readCourse(input.split("\n"));
let submarine = new Submarine();
movements.forEach((movement) => submarine.move(movement));
console.log(submarine.horizontal_position * submarine.depth);
