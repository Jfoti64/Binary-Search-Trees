import Node from './node';

class Tree {
  constructor(arr) {
    this.arr = this.sortAndFilter(arr);
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(arr, start, end, depth = 0) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1, depth + 1);
    node.right = this.buildTree(arr, mid + 1, end, depth + 1);
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

  levelOrderTraversal(root = this.root, callback = (node) => node.data) {
    if (!root) return []; // Handle an empty tree

    let queue = [];
    let result = []; // Array to hold results of callback
    queue.push(root);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      result.push(callback(currentNode)); // Apply callback to each node

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return result;
  }

  // Method to perform inorder traversal
  inOrderTraversal(node = this.root, callback = (node) => node.data) {
    let result = [];
    if (node !== null) {
      result = result.concat(this.inOrderTraversal(node.left, callback)); // Accumulate left subtree
      result.push(callback(node)); // Process and add current node
      result = result.concat(this.inOrderTraversal(node.right, callback)); // Accumulate right subtree
    }
    return result;
  }

  height(root = this.root) {
    if (root === null) return -1; // Correct base case for height

    // Compute the height of each subtree
    let lheight = this.height(root.left);
    let rheight = this.height(root.right);

    // Use the larger one and add 1 for the current node
    return Math.max(lheight, rheight) + 1;
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
