#!/usr/bin/env node

import Tree from "./binarySearchTree.js";
import prettyPrint from "./prettyprint.js";

let array = []
for (let i = 0; i < 20; i++) {
  const randomNumber = Math.floor(Math.random() * 100);
  array.push(randomNumber);
}

const binarySearchTree = new Tree(array)
prettyPrint(binarySearchTree.root)
console.log(binarySearchTree.isBalanced())
console.log(binarySearchTree.levelOrderI())
console.log(binarySearchTree.preOrder())
console.log(binarySearchTree.inOrder())
console.log(binarySearchTree.postOrder())
binarySearchTree.insert(101)
binarySearchTree.insert(102)
binarySearchTree.insert(103)
prettyPrint(binarySearchTree.root)
console.log(binarySearchTree.isBalanced())
binarySearchTree.rebalance();
prettyPrint(binarySearchTree.root)
console.log(binarySearchTree.isBalanced())
console.log(binarySearchTree.levelOrderI())
console.log(binarySearchTree.preOrder())
console.log(binarySearchTree.inOrder())
console.log(binarySearchTree.postOrder())