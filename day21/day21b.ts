const input = await Deno.readTextFile("./day21/day21_ex.txt");

const memoized = new Map<string, number[]>();

const delta = [
  [1, 0, 1, 0],
  [1, 0, 2, 0],
  [1, 0, 3, 0],
  [2, 0, 1, 0],
  [2, 0, 2, 0],
  [2, 0, 3, 0],
  [3, 0, 1, 0],
  [3, 0, 2, 0],
  [3, 0, 3, 0],
];

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

  for (const d of delta) {
    const newGame = [
      game[0] + d[0],
      game[1] + d[1],
      game[2] + d[2],
      game[3] + d[3],
    ];
    newGame[0] = newGame[0] % 10 === 0 ? 10 : newGame[0] % 10;
    newGame[1] += newGame[0];

    newGame[2] = newGame[2] % 10 === 0 ? 10 : newGame[2] % 10;
    newGame[3] += newGame[2];

    const winner = play(newGame);

    scores[0] += winner[0];
    scores[1] += winner[1];
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
  console.log(result)

  return 42;
}

console.log(solve(input));
