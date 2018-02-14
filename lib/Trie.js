import Node from './Node';

export default class Trie {
  constructor() {
    this.numberOfWords = 0;
    this.children = {};
  }

  count() {
    return this.numberOfWords;
  }

  insert(word) {

    const addWordToTrie = (node, word) => {
      const firstLetter = word[0];

      if (!node.children[firstLetter]) {
        node.children[firstLetter] = new Node(firstLetter);
      }
      if (word.length === 1) {
        this.numberOfWords++;
        node.children[firstLetter].completeWord = 1;
      }
      if (word.length > 1) {
        addWordToTrie(node.children[firstLetter], word.slice(1));
      }
    };

    addWordToTrie(this, word);
  }

  findEndOfWord(prefix) {
    let currentNode = this;
    let count = 0;

    while (count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];
      }
      count++;
    }
    return currentNode;
  }

  suggest(prefix) {
    const suggestions = [];
    let currentNode = this.findEndOfWord(prefix);

    const addSuggestion = (node, prefix) => {
      if (node.completeWord) {
        if (node.completeWord > 1) {
          suggestions.unshift(prefix);
        } else {
          suggestions.push(prefix);
        }
      }

      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newString = prefix + child;

        addSuggestion(node.children[child], newString);
      });
    };

    addSuggestion(currentNode, prefix);

    return suggestions;
  }

  populate(wordArray) {
    wordArray.forEach(word => this.insert(word));
  }

  select(word) {
    let currentNode = this.findEndOfWord(word);

    currentNode.completeWord++;
  }

  delete(word) {
    let currentNode = this.findEndOfWord(word);

    currentNode.completeWord = 0;
  }
}