import Node from "./node.js";
import mergeSort from "./mergeSort.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = mergeSort(array);
    const length = sortedArray.length;

    function sortedArrayToBST(array, start, finish) {
      if (start > finish) return null;
      const midle = Math.floor((start + finish) / 2);
      const node = new Node(array[midle]);
      node.left = sortedArrayToBST(array,start,midle - 1);
      node.right = sortedArrayToBST(array,midle + 1,finish);
      return node;
    }

    if (length === 0) return new Node(null);
    return sortedArrayToBST(sortedArray, 0, length - 1);
  }
}

export default Tree;