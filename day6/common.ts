const INTERVAL = 6;
const MAX_INTERVAL = 8;

export function solve(input: string, days: number): number {
  const fish = input.split(",").map((f) => parseInt(f)).reduce(
    (fishTimers, f) => {
      fishTimers[f] += 1;
      return fishTimers;
    },
    new Array(MAX_INTERVAL + 1).fill(0),
  );

  for (let i = 0; i < days; i++) {
    const zeroTimerFish = fish[0];

    for (let j = 0; j < fish.length - 1; j++) {
      fish[j] = fish[j + 1];
    }

    fish[INTERVAL] += zeroTimerFish;
    fish[fish.length - 1] = zeroTimerFish;
  }

  return fish.reduce((a, b) => a + b);
}
