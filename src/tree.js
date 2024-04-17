import Node from './node';

class Tree {
  constructor(arr) {
    this.arr = arr;
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
