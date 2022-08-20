/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i=0; i < this.words.length; i++) {
      let word = this.words[i];
      let next_word = this.words[i+1] || null;

      if (chains.has(word)) { 
         let identified_word = chains.get(word)
         identified_word.push(next_word)
      }
      else {
        chains.set(word,[next_word])
      }
    }
    this.chains = chains;
  }

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */
  // {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}

  makeText(numWords = 100) {
    
    let keys = Array.from(this.chains.keys())
    let key_arr = MarkovMachine.choice(keys);
    let result = [];

    while (key_arr !== null && result.length < numWords) {
      result.push(key_arr)
      key_arr = MarkovMachine.choice(this.chains.get(key_arr))
    }
    return result.join(' ');
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm)

module.exports = {
  MarkovMachine: MarkovMachine
};

// let mm = new MarkovMachine("the cat in the hat");