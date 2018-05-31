# Prefix Trie
## By [Jonathan Sweet](https://github.com/JSweet314)

This prefix trie is built to support an autocomplete feature.

## Setup
Install this repository as an npm package.

`npm install --save https://github.com/JSweet314/prefix-trie.git`

## Usage

Import the trie where needed.

`import Trie from '@jsweet314/Prefix-Trie/lib/Trie'`

Instantiate a new trie.

`const autocomplete = new Trie()`

Optionally, you may populate the trie with an array of entries

`autocomplete.populate(entriesArray)`

## Methods
* `.insert()`
  * adds a word or phrase to the trie
* `.delete()`
  * removes a word or phrase from the trie
* `.populate()`
  * takes an array of entries to be placed in the trie. 
* `.suggest()`
  * displays a list of suggested terms from the trie based on a provided prefix.
* `.select()`
  * increases the 'priority' of a provided word when displayed as a suggested result. Typically invoked when a word is selected from a list of suggestions.
* `.count()`
  * provides the total number of words in the trie.

[Here](https://github.com/JSweet314/Weatherly/blob/master/lib/Searchbar.js) is a code example of usage within a weather application built with React.js
