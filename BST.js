class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
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
    while (temp.left !== null || temp.right !== null) {
      if (value < temp.data && temp.left !== null) {
        temp = temp.left;
      } else if (value >= temp.data && temp.right !== null) {
        temp = temp.right;
      }
    }

    if (value < temp.data) {
      temp.left = new Node(value);
    } else {
      temp.right = new Node(value);
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

  find(value) {
    if (this.root.data === value) return this.root;

    let temp = this.root;
    while (temp.left !== null || temp.right !== null) {
      if (value < temp.data && temp.left !== null) {
        temp = temp.left;
      } else if (value >= temp.data && temp.right !== null) {
        temp = temp.right;
      }
      if (value === temp.data) {
        return temp;
      }
    }
    return "Node not found!";
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

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);
prettyPrint(tree.root);
console.log(tree.preOrderTraversal());
console.log(tree.inOrderTraversal());
console.log(tree.postOrderTraversal());
