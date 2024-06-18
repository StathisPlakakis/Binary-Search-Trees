import Node from "./node.js";
import mergeSort from "./mergeSort.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = mergeSort(array);
  }
}