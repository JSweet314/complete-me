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

  it('should be able track if a word is complete at a given node',() => {
    expect(node.completeWord).to.eql(0);
  })

  it('should be able to store child nodes', () => {
    expect(node.children).to.deep.equal({});
  })
})