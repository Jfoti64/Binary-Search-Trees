import Tree from './tree';

const newTree = new Tree([1, 7, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

newTree.insert(111);
newTree.find(111);

newTree.display();

newTree.inOrderTraversal();

console.log(newTree.height(newTree.root));
console.log("Depth of node with value 5:", newTree.findDepth(newTree.root, 5));
console.log("Is the tree balanced?", newTree.isBalanced());
