export class Movement {
  direction: string;
  value: number;

  constructor(direction: string, value: number) {
    this.direction = direction;
    this.value = value;
  }
}

export function readCourse(rawMovements: string[]): Movement[] {
  return rawMovements.map((movement) => {
    const movementList = movement.split(" ");
    return new Movement(movementList[0], parseInt(movementList[1]));
  });
}