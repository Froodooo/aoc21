const input = await Deno.readTextFile("./day21/day21.txt");
import { DieType, Game, readPlayers } from "./common.ts";

export function solve(input: string): number {
  const players = readPlayers(input);

  const game = new Game(players, DieType.Deterministic);
  game.play();

  return game.getLosers()[0].score * game.die.rolls;
}

console.log(solve(input));
