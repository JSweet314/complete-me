var path = require('path');

module.exports = {
  entry: './lib/Trie.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
