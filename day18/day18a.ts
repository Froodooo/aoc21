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

  while (node.parent) {
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

export function explode(root: Node, index: number = 0): boolean {
  let exploded = false;
  
  if (index === 4) {
    // console.log(root)
    if (root.left?.value !== undefined && root.right?.value !== undefined) {
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

      exploded = true;
    }
  }

  if (!exploded && root.left) {
    exploded = explode(root.left, index + 1);
  }

  if (!exploded && root.right) {
    exploded = explode(root.right, index + 1);
  }

  return exploded;
}

function createSplit(node: Node) {
  node.left = new Node();
  node.left.value = Math.floor(node.value! / 2);
  node.left.parent = node;

  node.right = new Node();
  node.right.value = Math.ceil(node.value! / 2);
  node.right.parent = node;

  node.value = undefined;
}

export function split(root: Node): boolean {
  let splitted = false;

  if (root.left?.value && root.left.value >= 10) {
    createSplit(root.left);
    splitted = true;
  }

  if (!splitted && root.right?.value && root.right.value >= 10) {
    createSplit(root.right);
    splitted = true;
  }

  if (!splitted && root.left) {
    splitted = split(root.left);
  }

  if (!splitted && root.right) {
    splitted = split(root.right);
  }

  return splitted;
}

function add(left: Node, right: Node): Node {
  const root = new Node();
  root.left = left;
  root.right = right;

  left.parent = root;
  right.parent = root;

  return root;
}

[[[[[3,0],[5,3]],[4,4]],[5,5]],[6,6]]

export function solve(input: string): number {
  const trees = readSnailfishNumbers(input);

  let root = trees[0];
  for (let i = 1; i < trees.length; i++) {
    root = add(root, trees[i]);
    // console.log(root.toString())

    let exploded, splitted;
    do {
      exploded = splitted = false;

      exploded = explode(root);
      splitted = split(root);
    } while (exploded || splitted);
  }
  console.log(root.toString())

  return 42;
}

console.log(solve(input));