import { expect } from 'chai';
import Node from '../lib/Node';
import Trie from '../lib/Trie';
import fs from 'fs';

describe('Trie', () => {
  let completion;

  beforeEach(() => {
    completion = new Trie();
  })

  it('should instantiate our good friend Trie', () => {
    expect(completion).to.exist.and.be.an.instanceOf(Trie);
  })

  it('should store child nodes', () => {
    expect(completion.root).to.exist.and.be.an.instanceOf(Node);
  })

  it('should track the number of words in the Trie', () => {
    expect(completion._count).to.eql(0);
  })

  describe('COUNT', () => {
    it('should return the number of words in the trie', () => {
      expect(completion.count).to.eql(0);
    })
  })

  describe('INSERT', () => {
    it('should increment the number of words', () => {
      expect(completion.count).to.eql(0);

      completion.insert('pizza');

      expect(completion.count).to.eql(1);
    })

    it('should add words to the trie', () => {
      completion.insert('pizza');
      completion.insert('piano');
      completion.insert('dog');
      completion.insert('dogs');

      expect(Object.keys(completion.root.children)).to.eql(['p', 'd']);
      expect(completion.root.children['p'].children['i'].children['z']).to.exist;
      expect(completion.root.children['p'].children['i'].children['a']).to.exist;
      expect(completion.root.children['d'].children['o'].children['g'].endOfWord).to.be.true;
    })

    it('should not add words to the trie if they already exist', () => {
      expect(completion.count).to.eql(0);

      completion.insert('pizza');

      expect(completion.count).to.eql(1);
      expect(completion.findLastNode('pizza').endOfWord).to.eql(true);

      completion.insert('pizza');

      expect(completion.count).to.eql(1);
      expect(completion.findLastNode('pizza').endOfWord).to.eql(true);
    })
  })

  describe('findLastNode', () => {
    it('should return the node corresponding to the last letter of a string', () => {
      completion.insert('pizza');

      expect(completion.findLastNode('pi')).to.exist.and.be.an.instanceOf(Node);

      const childrenKeys = Object.keys(completion.findLastNode('pi').children);
      expect(childrenKeys).to.eql(['z']);
      expect(completion.findLastNode('pi').children.z).to.exist.and.be.an.instanceOf(Node);
    })
  })

  describe('SUGGEST', () => {
    it('should return an array of words matching a provided prefix', () => {
      completion.insert('piano');
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('dog');
      completion.insert('dogs');

      let results = completion.suggest('pi');

      expect(results).to.eql(['piano', 'pizza', 'pizzas']);

      results = completion.suggest('dog');

      expect(results).to.eql(['dog', 'dogs']);
    });

    it('should return null if no match is found', () => {
      completion.insert('piano');

      expect(completion.suggest('z')).to.eql([]);
    })
  })

  describe('POPULATE', () => {
    it('should add an array of words to the trie', () => {
      completion.populate(['this', 'is', 'a', 'sentence']);

      expect(completion.count).to.eql(4);
      expect(completion.suggest('sentence')).to.eql(['sentence']);
    })

    it('should be able to add a large array of words', () => {
      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');

      completion.populate(dictionary);

      expect(completion.count).to.eql(235886);
      expect(completion.suggest('xylophone')).to.eql(['xylophone']);
    })
  })

  describe('SELECT', () => {
    it('should move selected words to the front of the suggestions array', () => {
      completion.insert('piano');
      completion.insert('pizza');
      completion.insert('pizzas');

      let suggestions = completion.suggest('pi');

      expect(suggestions[0]).to.eql('piano');

      completion.select('pizza');
      suggestions = completion.suggest('pi');

      expect(suggestions[0]).to.eql('pizza');
    })
  })

  describe('DELETE', () => {
    beforeEach(() => {
     completion.insert('piano');
     completion.insert('pizza');
     completion.insert('pizzas');
   })

    it('should remove a word from the suggested words array', () => {
      let suggestions = completion.suggest('pi');

      expect(suggestions).to.eql(['piano', 'pizza', 'pizzas']);

      completion.delete('pizza');
      suggestions = completion.suggest('pi');

      expect(suggestions).to.eql(['piano', 'pizzas']);
      expect(completion.findLastNode('pizza').endOfWord).to.eql(false);
    })

    it('should decrement the tries count', () => {
      expect(completion.count).to.eql(3);

      completion.delete('pizza');

      expect(completion.count).to.eql(2);
    })

    it('should not attempt to remove words that are not already in the trie', () => {
      expect(completion.count).to.eql(3);

      completion.delete('pizzad');

      expect(completion.count).to.eql(3);

      let test = completion.suggest('pizza');
      expect(test).to.eql(['pizza', 'pizzas']);
    });

  })
})