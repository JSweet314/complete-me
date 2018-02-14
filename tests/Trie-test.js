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
    expect(completion).to.exist;
    expect(completion).to.be.an.instanceOf(Trie);
  });

  it('should track the number of words in the Trie', () => {
    expect(completion.numberOfWords).to.equal(0);
  })

  it('should store child nodes', () => {
    expect(completion.children).to.eql({});
  })

  describe('COUNT', () => {
    it('should return the number of words in the trie', () => {
      completion.insert('pizza');
      expect(completion.count()).to.equal(1);
    })
  })

  describe('INSERT', () => {
    it('should increment the number of words', () => {
      completion.insert('pizza');
      expect(completion.count()).to.eq(1);
    })

    it('should add the word to the trie if it doesn\'t yet exist', () => {
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('piano');
      completion.insert('dog');
      completion.insert('dogs');
      expect(completion.children['p']).to.exist
      expect(completion.children['p'].children['i']).to.exist
      expect(completion.children['d'].children['o'].children['g'].completeWord).to.equal(1);
    })
  })

  describe('SUGGEST', () => {
    beforeEach(() => {
      completion.insert('piano');
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('dog');
    })

    it('should return an array of suggested words', () => {
      let results = completion.suggest('pi');

      let check1 = results.some(result => result === 'pizza');
      let check2 = results.some(result => result === 'pizzas');
      let check3 = results.some(result => result === 'piano');
      let check4 = results.some(result => result === 'dog');

      expect(check1).to.be.true;
      expect(check2).to.be.true;
      expect(check3).to.be.true;
      expect(check4).to.be.false;

      let results2 = completion.suggest('p');
      let checkv1 = results2.some(result => result === 'pizza');
      let checkv2 = results2.some(result => result === 'pizzas');
      let checkv3 = results2.some(result => result === 'piano');
      let checkv4 = results2.some(result => result === 'dog');

      expect(checkv1).to.be.true;
      expect(checkv2).to.be.true;
      expect(checkv3).to.be.true;
      expect(checkv4).to.be.false;
    })
  })

  describe('POPULATE', () => {
    it('should add an array of words to the trie', () => {
      completion.populate(['this', 'is', 'a', 'sentence']);
      expect(completion.count()).to.eq(4);
    });

    it('should be able to add a large array of words', () => {
      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');
      completion.populate(dictionary);
      expect(completion.count()).to.eq(235886);
    });
  })

  describe('SELECT', () => {
    it('should move selected words to the front of the array', () => {
      completion.insert('piano');
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('dog');
      let result = completion.suggest('pi');
      expect(result[0]).to.equal('piano');
      completion.select('pizza');
      result = completion.suggest('pi');
      expect(result[0]).to.equal('pizza');

    })
  })

  describe('DELETE', () => {
    it('should remove a word from the suggested words array', () => {
      completion.insert('piano');
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('dog');
      let result = completion.suggest('pi');
      expect(result).to.eql(['piano', 'pizza', 'pizzas']);
      completion.delete('pizza');
      result = completion.suggest('pi');
      expect(result).to.eql(['piano', 'pizzas']);
    })
  })
})

