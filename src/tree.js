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
      }
      if (node.left === null) {
        return node.right; // One child (right), return it to link it back to parent
      }
      if (node.right === null) {
        return node.left; // One child (left), return it to link it back to parent
      }

      // Two children, get the inorder successor (smallest in the right subtree)
      const successor = this.findMin(node.right);
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
    if (value > node.data) {
      return this.find(value, node.right);
    }
    // If the current node's data matches the search value, return the node
    return node;
  }

  levelOrderTraversal(root = this.root, callback = (node) => node.data) {
    if (!root) return []; // Handle an empty tree

    const queue = [];
    const result = []; // Array to hold results of callback
    queue.push(root);

    while (queue.length > 0) {
      const currentNode = queue.shift();
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

  height(node) {
    if (node === null) return -1;

    // Compute the height of each subtree
    const lheight = this.height(node.left);
    const rheight = this.height(node.right);

    // Use the larger one and add 1 for the current node
    return Math.max(lheight, rheight) + 1;
  }

  findDepth(node, target, depth = 0) {
    if (node === null) return -1; // Base case: node not found
    if (node.data === target) return depth; // Target node found, return current depth

    // Recursively search for target in left and right subtrees
    const left = this.findDepth(node.left, target, depth + 1);
    if (left !== -1) return left; // Target found in left subtree

    return this.findDepth(node.right, target, depth + 1); // Check right subtree
  }

  isBalanced(node = this.root) {
    const checkBalance = (node) => {
      if (node === null) return { balanced: true, height: -1 };

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
      const height = 1 + Math.max(left.height, right.height);

      return { balanced, height };
    };

    return checkBalance(node).balanced;
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
