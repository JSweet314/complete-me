export default class Node {
  constructor(data) {
    this.data = data;
    this.endOfWord = 0;
    this.children = {};
  }
}