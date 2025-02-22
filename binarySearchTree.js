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

  preOrder(callback) {
    let arr = [];
    function preOrderRec(node, callback) {
      if (typeof callback !== 'function') {
        if (!node) return node;
        arr.push(node.data)
        preOrderRec(node.left, callback);
        preOrderRec(node.right, callback);
        return arr;
      }
      if (!node) return node;
      callback(node);
      preOrderRec(node.left, callback);
      preOrderRec(node.right, callback);
    }
    return preOrderRec(this.root, callback);
  }

  inOrder(callback) {
    let arr = [];
    function inOrderRec(node, callback) {
      if (typeof callback !== 'function') {
        if (!node) return node;
        inOrderRec(node.left, callback);
        arr.push(node.data)
        inOrderRec(node.right, callback);
        return arr;
      }
      if (!node) return node;
      inOrderRec(node.left, callback);
      callback(node);
      inOrderRec(node.right, callback);
    }
    return inOrderRec(this.root, callback);
  }

  postOrder(callback) {
    let arr = [];
    function postOrderRec(node, callback) {
      if (typeof callback !== 'function') {
        if (!node) return node;
        postOrderRec(node.left, callback);
        postOrderRec(node.right, callback);
        arr.push(node.data)
        return arr;
      }
      if (!node) return node;
      postOrderRec(node.left, callback);
      postOrderRec(node.right, callback);
      callback(node);
    }
    return postOrderRec(this.root, callback);
  }

  height(value) {
    const node = this.find(value);
    if (!node) return node;
    function heightRec(node, height) {
      if (!node) return height;
      if (node.right || node.left) {
      height += 1;
      }
      const leftHeight = heightRec(node.left, height);
      const rightHeight = heightRec(node.right, height);
      return Math.max(leftHeight, rightHeight);
    }
    return heightRec(node, 0);
  }

  depth(value) {
    function depthRec(node, depth) {
      if (!node) return node;
      if (node.data > value) return depthRec(node.left, depth + 1);
      else if (node.data < value) return depthRec(node.right, depth + 1);
      return depth;
    }
  return depthRec(this.root, 0);
  }

  isBalanced() {
    function isBalancedRec(node, height) {
      if (!node) return [height, true];
      const left = (node.left) ? 
                    isBalancedRec(node.left, height + 1) :
                    isBalancedRec(node.left, height);
      const leftIsBalanced = left[1];
      if (!leftIsBalanced) return false;
      const leftHeight = left[0];              
      const right = (node.right) ? 
                     isBalancedRec(node.right, height + 1) :
                     isBalancedRec(node.right, height);
      const rightIsBalanced = right[1];              
      if (!rightIsBalanced) return false;   
      const rightHeight = right[0];
      const heightDifference = rightHeight > leftHeight ?
                               rightHeight - leftHeight <= 1 :
                               leftHeight - rightHeight <= 1;              
      return [Math.max(leftHeight, rightHeight), heightDifference];
    }
    const result = isBalancedRec(this.root, 0)
    return result ? result[1] : false
  }

  rebalance() {
    const nodes = this.preOrder();
    this.root = this.buildTree(nodes)
  }
}

export default Tree;