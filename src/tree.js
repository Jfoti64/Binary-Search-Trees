import Node from './node';

class Tree {
  constructor(arr) {
    this.arr = this.sortAndFilter(arr);
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }

  buildTree(arr, start, end) {
    /* Base Case */
    if (start > end) {
      return null;
    }
    /* Get the middle element and make it root */
    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it 
     left child of root */
    node.left = this.buildTree(arr, start, mid - 1);
    /* Recursively construct the right subtree and make it 
     right child of root */
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  sortAndFilter(arr) {
    const uniqueElements = new Set(arr);
    const sortedArray = Array.from(uniqueElements).sort((a, b) => a - b);
    return sortedArray;
  }

  insert(value, node = this.root) {
    // If the tree/node is empty, return a new node
    if (node === null) {
      if (this.root === null) {
        this.root = new Node(value); // Establish the root if the tree is entirely empty
        return this.root;
      }
      return new Node(value);
    }

    // Otherwise, recur down the tree
    if (value < node.data) {
      node.left = this.insert(value, node.left); // Recursive insert on the left subtree
    } else if (value > node.data) {
      node.right = this.insert(value, node.right); // Recursive insert on the right subtree
    }

    // Return the (unchanged) node pointer
    return node;
  }

  display(node = this.root) {
    const prettyPrint = (node, prefix = '', isLeft = true) => {
      if (node === null) {
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}null`);
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    };

    prettyPrint(node);
  }
}

export default Tree;
