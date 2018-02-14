import Node from './Node';

export default class Trie {
  constructor() {
    this.children = {};
    this._count = 0;
  }

  get count() {
    return this._count;
  }

  addWordToTrie(node, word) {
    const letter = word[0];

    if (!node.children[letter]) {
      node.children[letter] = new Node();
    }

    const wordExists = node.children[letter].endOfWord;

    if (word.length === 1 && !wordExists) {
      this._count++;
      node.children[letter].endOfWord = true;
    }

    if (word.length > 1) {
      this.addWordToTrie(node.children[letter], word.slice(1));
    }
  }

  insert(word) {
    this.addWordToTrie(this, word);
  }

  findLastNode(word) {
    let currentNode = this;

    for (let i = 0; i < word.length; i++) {
      if (currentNode.children[word[i]]) {
        currentNode = currentNode.children[word[i]];
      }
    }

    return currentNode;
  }

  addSuggestions(node, prefix, array) {
    if (node === this) {
      return;
    }

    if (node.endOfWord) {
      array.push({word: prefix, priority: node.priority});
    }

    Object.keys(node.children).forEach(child => {
      const newString = prefix + child;

      this.addSuggestions(node.children[child], newString, array);
    });
  }

  sortSuggestions(suggestions) {
    if (!suggestions.length) {
      return null;
    }

    suggestions.sort((wordObjA, wordObjB) => {
      return wordObjB.priority - wordObjA.priority;
    });

    return suggestions.map(wordObj => wordObj.word);
  }

  suggest(prefix) {
    const suggestions = [];
    let currentNode = this.findLastNode(prefix);

    this.addSuggestions(currentNode, prefix, suggestions);

    return this.sortSuggestions(suggestions);
  }

  populate(wordArray) {
    wordArray.forEach(word => this.insert(word));
  }

  select(word) {
    let currentNode = this.findLastNode(word);

    currentNode.priority++;
  }

  delete(word) {
    let currentNode = this.findLastNode(word);

    this._count--;
    currentNode.endOfWord = false;
  }
}