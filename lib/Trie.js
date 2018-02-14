import Node from './Node';

export default class Trie {
  constructor() {
    this.children = {};
    this._count = 0;
  }

  get count() {
    return this._count;
  }

  insert(word) {
    const addWordToTrie = (node, word) => {
      const letter = word[0];

      if (!node.children[letter]) {
        node.children[letter] = new Node(letter);
      }

      const wordExists = node.children[letter].endOfWord;

      if (word.length === 1 && !wordExists) {
        this._count++;
        node.children[letter].endOfWord = 1;
      }

      if (word.length > 1) {
        addWordToTrie(node.children[letter], word.slice(1));
      }
    };

    addWordToTrie(this, word);
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

  suggest(prefix) {
    const suggestions = [];
    let currentNode = this.findLastNode(prefix);

    const addSuggestions = (node, prefix) => {
      if (node === this) {
        return;
      }

      if (node.endOfWord) {
        suggestions.push({word: prefix, selectCount: node.endOfWord - 1});
      }

      Object.keys(node.children).forEach(child => {
        const newString = prefix + child;

        addSuggestions(node.children[child], newString);
      });
    };

    addSuggestions(currentNode, prefix);

    return this.sortSuggestions(suggestions);
  }

  sortSuggestions(suggestions) {
    if (!suggestions.length) {
      return null;
    }

    suggestions.sort( (wordObjA, wordObjB) => {
      return wordObjB.selectCount - wordObjA.selectCount;
    });

    return suggestions.map(wordObj => wordObj.word);
  }

  populate(wordArray) {
    wordArray.forEach(word => this.insert(word));
  }

  select(word) {
    let currentNode = this.findLastNode(word);

    currentNode.endOfWord++;
  }

  delete(word) {
    let currentNode = this.findLastNode(word);

    currentNode.endOfWord = 0;
  }
}