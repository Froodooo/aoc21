import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { buildTree, explode } from "./day18a.ts";

// Deno.test("Example 1", async () => {
//   const input = await Deno.readTextFile("./day18/day18_ex.txt");
//   assertEquals(true, true);
// });

Deno.test("buildTree", () => {
  const list1 = [[[[[9, 8], 1], 2], 3], 4];
  assertEquals(buildTree(list1).toString(), "[[[[[9,8],1],2],3],4]");

  const list2 = [[[0, [5, 8]], [[1, 7], [9, 6]]], [[4, [1, 2]], [[1, 4], 2]]];
  assertEquals(
    buildTree(list2).toString(),
    "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]",
  );
});

Deno.test("explode", () => {
  // assertEquals(explode(buildTree([[[[[9,8],1],2],3],4])).toString(), "[[[[0,9],2],3],4]")
  // assertEquals(explode(buildTree([7,[6,[5,[4,[3,2]]]]])).toString(), "[7,[6,[5,[7,0]]]]")
  // assertEquals(explode(buildTree([[6,[5,[4,[3,2]]]],1])).toString(), "[[6,[5,[7,0]]],3]")
  assertEquals(explode(buildTree([[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]])).toString(), "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]")
});