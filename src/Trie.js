const Node = require('./Node');

class Trie {
  constructor() {
    this.root = new Node();
    this._count = 0;
  }

  get count() {
    return this._count;
  }

  addWordToTrie(node, word) {
    const letter = word.charAt(0);

    if (!node.children[letter]) {
      node.children[letter] = new Node();
    }

    const wordDoesNotYetExist = !node.children[letter].endOfWord;

    if (word.length === 1 && wordDoesNotYetExist) {
      this._count++;
      node.children[letter].endOfWord = true;
    }

    if (word.length > 1) {
      this.addWordToTrie(node.children[letter], word.slice(1));
    }
  }

  insert(word) {
    if (word.length) {
      this.addWordToTrie(this.root, word);
    }
  }

  findLastNode(word) {
    let currentNode = this.root;
    let numberOfNodesTraversed = 0;

    for (let i = 0; i < word.length; i++) {
      if (currentNode.children[word[i]]) {
        currentNode = currentNode.children[word[i]];
        numberOfNodesTraversed++;
      }
    }

    if (numberOfNodesTraversed !== word.length) {
      return null;
    }

    return currentNode;
  }

  addSuggestions(node, prefix, array) {
    if (node.endOfWord) {
      array.push({word: prefix, priority: node.priority});
    }

    Object.keys(node.children).forEach(child => {
      const newWord = prefix + child;

      this.addSuggestions(node.children[child], newWord, array);
    });
  }

  sortSuggestions(suggestions) {
    suggestions.sort((wordObjA, wordObjB) => {
      return wordObjB.priority - wordObjA.priority;
    });

    return suggestions.map(wordObj => wordObj.word);
  }

  suggest(prefix) {
    const suggestions = [];

    let currentNode = this.findLastNode(prefix);

    if (!currentNode) {
      return suggestions;
    }

    this.addSuggestions(currentNode, prefix, suggestions);

    return this.sortSuggestions(suggestions);
  }

  populate(wordArray) {
    wordArray.forEach(word => this.insert(word));
  }

  select(word) {
    let currentNode = this.findLastNode(word);

    if (currentNode) {
      currentNode.priority++;
    }
  }

  delete(word) {
    let currentNode = this.findLastNode(word);

    if (currentNode) {
      this._count--;
      currentNode.endOfWord = false;
    }
  }
}

module.exports = Trie;