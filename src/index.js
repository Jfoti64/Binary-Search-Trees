import Tree from './tree';

function randumNumArr() {
  const arr = [];
  while (arr.length < 100) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}

const newTree = new Tree(randumNumArr());

console.log('Is the tree balanced?', newTree.isBalanced());
console.log(newTree.inOrderTraversal(newTree.root));

newTree.insert(101);
newTree.insert(141);
newTree.insert(121);

console.log('Is the tree balanced?', newTree.isBalanced());

newTree.rebalance();

console.log('Is the tree balanced?', newTree.isBalanced());

newTree.display();
