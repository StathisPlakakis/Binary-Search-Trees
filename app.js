#!/usr/bin/env node

import Tree from "./binarySearchTree.js";
import prettyPrint from "./prettyprint.js";

const newTree = new Tree([1,0,3,4,2,-1,6,3,6,0,1]);
prettyPrint(newTree.root)