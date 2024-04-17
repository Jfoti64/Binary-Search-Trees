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

  delete(value, node = this.root) {
    if (node === null) {
      return null; // Base case: value not found
    }

    if (value < node.data) {
      node.left = this.delete(value, node.left); // Go left
    } else if (value > node.data) {
      node.right = this.delete(value, node.right); // Go right
    } else {
      // Node to delete is found
      if (node.left === null && node.right === null) {
        return null; // No children, return null to unlink node
      } else if (node.left === null) {
        return node.right; // One child (right), return it to link it back to parent
      } else if (node.right === null) {
        return node.left; // One child (left), return it to link it back to parent
      }

      // Two children, get the inorder successor (smallest in the right subtree)
      let successor = this.findMin(node.right);
      node.data = successor.data; // Copy the inorder successor's value to the node
      node.right = this.delete(successor.data, node.right); // Delete the inorder successor
    }
    return node;
  }

  findMin(node) {
    let current = node;
    while (current && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value, node = this.root) {
    // Base case: check if the current node is null
    if (node === null) {
      return null;
    }

    // Navigate left
    if (value < node.data) {
      return this.find(value, node.left);
    } 
    // Navigate right
    else if (value > node.data) {
      return this.find(value, node.right);
    }
    // If the current node's data matches the search value, return the node
    else {
      console.log(node);
      return node;
    }
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
