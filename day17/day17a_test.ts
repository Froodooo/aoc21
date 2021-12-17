import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { solve } from "./day17a.ts";

Deno.test("Example 1", async () => {
  const input = await Deno.readTextFile("./day17/day17_ex.txt");
  assertEquals(solve(input), 45);
});

Deno.test("Day 17", async () => {
  const input = await Deno.readTextFile("./day17/day17.txt");
  assertEquals(solve(input), 10011);
});
