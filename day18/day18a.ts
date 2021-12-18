type SnailfishNumber = any;

const input = await Deno.readTextFile("./day18/day18_ex.txt");

export class Node {
  id: string;
  parent: Node | undefined;
  left: Node | undefined;
  right: Node | undefined;
  value: number | undefined;

  constructor() {
    // https://stackoverflow.com/a/8084248
    this.id = (Math.random() + 1).toString(36).substring(7);
  }

  toString(): string {
    if (Number.isInteger(this.value)) {
      return `${this.value}`;
    }
    return `[${this.left?.toString()},${this.right?.toString()}]`;
  }
}

export function buildTree(snailfishNumber: SnailfishNumber): Node {
  const root = new Node();

  if (Number.isInteger(snailfishNumber)) {
    root.value = snailfishNumber;
    return root;
  }

  const [left, right] = snailfishNumber;
  root.left = buildTree(left);
  root.right = buildTree(right);

  root.left.parent = root;
  root.right.parent = root;

  return root;
}

function readSnailfishNumbers(input: string): Node[] {
  return input.split("\n").map((line) => eval(line)).map((line) =>
    buildTree(line)
  );
}

function findClosestLeft(node: Node): Node | null {
  const visited = new Set<string>();
  visited.add(node.id);
  let found = false;

  while (node.parent) {
    node = node.parent;
    visited.add(node.id);
    if (node.left && !visited.has(node.left.id)) {
      node = node.left;
      found = true;
      break;
    }
  }

  if (!found) {
    return null;
  }

  while (node && node.right) {
    node = node.right;
  }

  return node;
}

function findClosestRight(node: Node): Node | null {
  const visited = new Set<string>();
  visited.add(node.id);
  let found = false;

  while (node.parent)  {
    node = node.parent;
    visited.add(node.id);
    if (node.right && !visited.has(node.right.id)) {
      node = node.right;
      found = true;
      break;
    }
  }

  if (!found) {
    return null;
  }

  while (node && node.left) {
    node = node.left;
  }

  return node;
}

export function explode(root: Node, index: number = 0): Node {
  if (index === 4) {
    if (root.left?.value && root.right?.value) {
      console.log(root.left.value, root.right.value)
      const closestRight = findClosestRight(root);
      if (closestRight) {
        closestRight.value! += root.right?.value;
      } 

      const closestLeft = findClosestLeft(root);
      if (closestLeft) {
        closestLeft.value! += root.left?.value;
      }

      root.left = undefined;
      root.right = undefined;
      root.value = 0;
    }
  }

  if (root.left) {
    explode(root.left, index + 1)
  }

  if (root.right) {
    explode(root.right, index + 1)
  }

  return root;
}

function solve(input: string): number {
  const trees = readSnailfishNumbers(input);

  return 42;
}

console.log(solve(input));
