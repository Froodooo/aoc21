import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

Deno.test("Example 1", async () => {
  const input = await Deno.readTextFile("./day15/day15_ex.txt");
  assertEquals(true, true);
});
