export default class Node {
  constructor(data) {
    this.data = data;
    this.completeWord = 0;
    this.children = {};
  }
}