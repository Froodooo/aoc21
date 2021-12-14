import { frequencies } from "https://deno.land/x/pine@0.5.0/frequencies.ts";
const input = await Deno.readTextFile("./day14/day14.txt");

type rules = Map<string, string>;

function readRules(input: string): rules {
  return input.split("\n").reduce((rules, line) => {
    const [rawPair, insertion] = line.split(" -> ");
    const pair = rawPair.split("");
    const replacement = [pair[0], insertion, pair[1]].join("");
    rules.set(rawPair, replacement);
    return rules;
  }, new Map<string, string>());
}

function step(polymer: string, rules: rules): string {
  let index = 0;
  while (index < polymer.length - 1) {
    const pair = polymer.substring(index, index + 2);
    const replacement = rules.get(pair);
    const replaced = replacement ?? pair;
    polymer = polymer.substring(0, index) + replaced +
      polymer.substring(index + 2);
    index += 2;
  }

  return polymer;
}

export function solve(input: string): number {
  const [polymer, rawRules] = input.split("\n\n");
  const rules = readRules(rawRules);

  let steppedPolymer = polymer;
  for (let i = 0; i < 40; i++) {
    steppedPolymer = step(steppedPolymer, rules);
  }

  const frequencyMap = frequencies(steppedPolymer.split(""));
  const values = Array.from(frequencyMap.values()).sort((a, b) => a - b);

  return values[values.length - 1] - values[0];
}

console.log(solve(input));
