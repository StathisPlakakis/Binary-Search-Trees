#!/usr/bin/env node

import Tree from "./binarySearchTree.js";
import prettyPrint from "./prettyprint.js";

const newTree = new Tree([37, 122, 3021, -13, -1, 27, 0]);
newTree.insert(23)
newTree.insert(24)
newTree.insert(3022)

prettyPrint(newTree.root)
console.log(newTree.isBalanced())