import {expect} from 'chai';
import Node from '../lib/Node';

describe('Node', () => {
  let node;
  beforeEach(() => {
    node = new Node();
  })

  it('should exist', () => {
    expect(node).to.exist;
  })

  it('should be able track if it is the last letter of a word in the trie',() => {
    expect(node.endOfWord).to.eql(false);
  })

  it('should be able to store child nodes', () => {
    expect(node.children).to.eql({});
  })
})