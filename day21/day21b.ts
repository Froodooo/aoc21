const input = await Deno.readTextFile("./day21/day21_ex.txt");

const memoized = new Map<string, number[]>();

function play(game: number[]): number[] {
  if (game[1] >= 21) {
    return [1, 0];
  }

  if (game[3] >= 21) {
    return [0, 1];
  }

  const key = game.join(",");

  if (memoized.has(key)) {
    return memoized.get(key)!;
  }

  const scores = [0, 0];

  for (let die1 of [1, 2, 3]) {
    for (let die2 of [1, 2, 3]) {
      for (let die3 of [1, 2, 3]) {
        let newPosition = game[0] + die1 + die2 + die3;
        newPosition = newPosition % 10 === 0 ? 10 : newPosition % 10;
        const newScore = game[1] + newPosition;

        const newGame = [game[2], game[3], newPosition, newScore];

        const winner = play(newGame);

        scores[0] += winner[0];
        scores[1] += winner[1];
      }
    }
  }

  memoized.set(key, scores);

  return scores;
}

function readGame(input: string): number[] {
  return input.split("\n").reduce((acc: number[], line) => {
    const [_, _id, position] = line.match(
      /^Player (\d+) starting position: (\d+)$/,
    )!;
    acc.push(+position);
    acc.push(0);
    return acc;
  }, []);
}

export function solve(_input: string): number {
  const game = readGame(input);

  const result = play(game);
  console.log(result);

  return 42;
}

console.log(solve(input));
