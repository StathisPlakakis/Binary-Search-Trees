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

  insert(value) {
    function insertRec(root, value) {
      if (!root) {
        return new Node(value);
      }else {
        if (root.data < value) {
          root.right = insertRec(root.right, value);
        }else if (root.data > value) {
          root.left = insertRec(root.left, value);
        }
        return root;
      }
    }
    return insertRec(this.root, value)
  }

  deleteItem(value) {
    function deleteRec(root, value) {
      if (!root) return root;
      if (root.data > value) {
        root.left = deleteRec(root.left, value);
      }else if (root.data < value) {
        root.right = deleteRec(root.right, value);
      }else {
        if (!root.left) {
          return root.right;
        }else if (!root.right) {
          return root.left;
        }
        root.data = minValue(root.right)
        root.right = deleteRec(root.right, root.data)
      }
      return root;
    }

    function minValue(root) {
      let minV = root.data;
      while (root.left) {
        minV = root.left.data;
        root = root.left
      }
      return minV;
    }

    return deleteRec(this.root, value);
  }

  find(value) {
    function findRec(root, value) {
      if (!root) return root;
      if (root.data > value) {
        return findRec(root.left, value);
      }else if (root.data < value) {
        return findRec(root.right, value);
      }
      return root;
    }
    return findRec(this.root, value);
  }

  levelOrderI(callback) {
    if (typeof callback !== 'function') {
      let arr = [];
      let arr2 = [];
    if (this.root) {
      arr.push(this.root);
    }
    while (arr.length !== 0) {
      const node = arr.shift();
      if (node.left) {
        arr.push(node.left);
      }
      if (node.right) {
        arr.push(node.right);
      }
      arr2.push(node.data);
    }
    return arr2;
    }
    
    let arr = [];
    if (this.root) {
      arr.push(this.root);
    }
    while (arr.length !== 0) {
      const node = arr.shift();
      if (node.left) {
        arr.push(node.left);
      }
      if (node.right) {
        arr.push(node.right);
      }
      callback(node);
    }
  }
}

export default Tree;