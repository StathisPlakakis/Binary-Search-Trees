#!/usr/bin/env node

import Tree from "./binarySearchTree.js";
import prettyPrint from "./prettyprint.js";

const newTree = new Tree([21,10,3,84,24,-1,6,3,6,0,1]);
prettyPrint(newTree.root)
