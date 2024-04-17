import Tree from './tree';

const newTree = new Tree([1, 7, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

newTree.insert(111);
newTree.find(111);

newTree.display();

console.log(newTree.levelOrderTraversal());
