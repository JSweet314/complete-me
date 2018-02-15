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

    const blah;
  }

  insert(word) {
    // call the addWordToTrie method and pass in 'this' (i.e. the root, or trie itself), and the word
    this.addWordToTrie(this, word);
  }

  findLastNode(word) {
    // start at the root level
    let currentNode = this;
    let numberOfNodesTraversed = 0

    // move down the trie to the appropriate nodes as many times as there are letters in the word.
    for (let i = 0; i < word.length; i++) {
      if (currentNode.children[word[i]]) {
        currentNode = currentNode.children[word[i]];
        numberOfNodesTraversed++
      }
    }

    // if the given prefix is not in the trie, then the number of nodes traveresed will not match the length of the word. if so, return null;
    if (numberOfNodesTraversed !== word.length) {
      return null;
    }
    // return the current node
    return currentNode
  }

  addSuggestions(node, prefix, array) { // mutates the array passed in as a parameter (adds to the array)

    //if the node is not found as expected prior to being passed in as an argument to this method, return out of the method (prefix doesn't belong to any word in the trie)
    if (!node) {
      return;
    }

    // if the node corresponds to a terminal node of a word, push an object to the array inclusive of the word and its priority indicating its location in the suggestions array.
    if (node.endOfWord) {
      array.push({word: prefix, priority: node.priority})
    }

    // if there are any children of the current node, pass those children to this method along with the current prefix and array as it is build thus far.
    Object.keys(node.children).forEach(child => {
      const newWord = prefix + child;

      this.addSuggestions(node.children[child], newWord, array);
    })
  }

  sortSuggestions(suggestions) {
    //if the suggestions array is empty, return null since no words are built from the given prefix used to build the array
    if (!suggestions.length) {
      return null;
    }

    // sort the array of objects based on priority
    suggestions.sort((wordObjA, wordObjB) => {
      return wordObjB.priority - wordObjA.priority;
    });

    // return a mapped array of words from the sorted suggestions array
    return suggestions.map(wordObj => wordObj.word);
  }

  suggest(prefix) {
    const suggestions = [];

  // traverse to node at end of given prefix
  let currentNode = this.findLastNode(prefix);

  //pass that node, the prefix from which to build suggestions, and array to store them in to the addSuggestions function
  this.addSuggestions(currentNode, prefix, suggestions);

  // sort the array by priority (functionality supporting .select()) and return it
  return this.sortSuggestions(suggestions);
}

populate(wordArray) {
  wordArray.forEach(word => this.insert(word));
}

select(word) {

    // find the last node of the word argument
    let currentNode = this.findLastNode(word);

    // increment the priority of that letter, corresponding to the terminus of an inserted word.
    currentNode.priority++;
  }


  delete(word) {

    //find the last node of the word argument
    let currentNode = this.findLastNode(word);

    if (currentNode) {
      //reduce the tries word count
      this._count--;
      //set the endOfWord property of the found node
      currentNode.endOfWord = false;
    }
  }
}