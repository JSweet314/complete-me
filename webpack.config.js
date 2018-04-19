var path = require('path');

module.exports = {
  entry: './src/Trie.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};
