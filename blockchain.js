const Block = require("./block");
const hashing = require("./hashing");

// * blockchain class
class Blockchain {
  // * initialising chain with genesis block
  constructor() {
    this.chain = [Block.genesis()];
  }

  // * checking for the longest chain and updating if it is
  static isLongestChain(chain) {
    if (chain <= this.chain.length) {
      console.error("The incoming chain is not longer than current chain.");
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain is not valid.");
      return;
    }

    this.chain = chain;
  }

  // * cheching  if the passed chain is valid or not
  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // * checking for valid difficulty

    // * mapping with each currnt block's prevHash with prev block's hash
    for (let i = 1; i < chain.length; i++) {
      const { nonce, difficulty, timeStamp, prevHash, data, hash } = chain[i];
      const validPrevHash = chain[i - 1].hash;
      const prevDifficulty = chain[i - 1].difficulty;

      if (prevHash !== validPrevHash) {
        return false;
      }

      const validHash = hashing(nonce, difficulty, timeStamp, prevHash, data);
      if (hash !== validHash) {
        console.log(hash);
        console.log(validHash);
        return false;
      }

      if (Math.abs(prevDifficulty - difficulty) > 1) return false;
    }
    return true;
  }

  // * adding block to the chain
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],
      data,
    });

    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
