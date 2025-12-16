class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = [...new Set(array.sort((a, b) => a - b))]; // sort and remove duplicates
    this.root = this.buildTree(this.array);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((end + start) / 2);
    let rootNode = new Node(arr[mid]);

    rootNode.left = this.buildTree(arr, start, mid - 1);
    rootNode.right = this.buildTree(arr, mid + 1, end);

    return rootNode;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let temp = this.root;
    while (true) {
      if (value < temp.data) {
        if (temp.left === null) {
          temp.left = new Node(value);
          break;
        }
        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = new Node(value);
          break;
        }
        temp = temp.right;
      }
    }
  }

  delete(value, curNode = this.root) {
    if (curNode === null) return curNode;

    if (curNode.data > value) {
      curNode.left = this.delete(value, curNode.left);
    } else if (curNode.data < value) {
      curNode.right = this.delete(value, curNode.right);
    } else {
      // Node with 0 or 1 child
      if (curNode.left === null) return curNode.right;
      if (curNode.right === null) return curNode.left;

      // Node with 2 children
      // Find successor (minimum value in the right subtree)
      let successor = curNode.right;
      while (successor !== null && successor.left !== null) {
        successor = successor.left;
      }
      curNode.data = successor.data;
      curNode.right = this.delete(successor.data, curNode.right);
    }
    return curNode;
  }

  find(value, root = this.root) {
    while (root !== null) {
      if (root.data === value) return root;

      if (value < root.data) {
        root = root.left;
      } else {
        root = root.right;
      }
    }
    return null;
  }

  levelOrderTraversal(queue = [this.root]) {
    let arr = [];
    while (queue[0]) {
      arr.push(queue[0].data);
      if (queue[0].left !== null) queue.push(queue[0].left);
      if (queue[0].right !== null) queue.push(queue[0].right);
      queue.shift();
    }
    return arr;
  }

  preOrderTraversal(root = this.root, arr = []) {
    if (root === null) return;

    arr.push(root.data);
    this.preOrderTraversal(root.left, arr);
    this.preOrderTraversal(root.right, arr);

    return arr;
  }

  inOrderTraversal(root = this.root, arr = []) {
    if (root === null) return;

    this.inOrderTraversal(root.left, arr);
    arr.push(root.data);
    this.inOrderTraversal(root.right, arr);

    return arr;
  }

  postOrderTraversal(root = this.root, arr = []) {
    if (root === null) return;

    this.postOrderTraversal(root.left, arr);
    this.postOrderTraversal(root.right, arr);
    arr.push(root.data);

    return arr;
  }

  depth(value, root = this.root) {
    let counter = 0;
    while (root !== null) {
      if (root.data === value) return counter;

      if (value < root.data) {
        root = root.left;
      } else {
        root = root.right;
      }
      counter++;
    }
    return null;
  }

  height(value) {
    let node = this.find(value);

    function nodeHeight(root) {
      if (root === null) return -1;
      let rHeight = nodeHeight(root.right);
      let lHeight = nodeHeight(root.left);
      return Math.max(rHeight, lHeight) + 1;
    }

    return nodeHeight(node);
  }

  isBalanced(root = this.root) {
    function checkHeight(node) {
      if (node === null) return 0;
      let rHeight = checkHeight(node.right);
      if (rHeight === -1) return -1;
      let lHeight = checkHeight(node.left);
      if (lHeight === -1) return -1;
      if (Math.abs(rHeight - lHeight) > 1) {
        return -1;
      }
      return Math.max(rHeight, lHeight) + 1;
    }
    if (checkHeight(root) === -1) return false;
    else return true;
  }

  rebalance() {
    if (this.isBalanced()) {
      console.log("Tree is already balanced");
      return;
    }
    this.array = this.inOrderTraversal();
    this.root = this.buildTree(this.array);
  }
}

// function to visualize the tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// test
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
prettyPrint(tree.root);
tree.insert(10);
tree.insert(11);
prettyPrint(tree.root);
tree.rebalance();
prettyPrint(tree.root);
