const { GENESIS_DATA, MINE_RATE } = require("./config");
const hashing = require("./hashing");
const hexToBinary = require("hex-to-binary");

class Block {
  // * initializing values
  constructor({ nonce, difficulty, timeStamp, prevHash, data, hash }) {
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.timeStamp = timeStamp;
    this.prevHash = prevHash;
    this.data = data;
    this.hash = hash;
  }

  // * genesis state
  static genesis() {
    return new this(GENESIS_DATA);
  }

  // * mining block
  static mineBlock({ prevBlock, data }) {
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;
    // * initial values
    let timeStamp,
      hash,
      nonce = 0;

    // * calculating nonce and hash with difficulty
    do {
      nonce++;
      timeStamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timeStamp: timeStamp,
      });
      hash = hashing(nonce, difficulty, timeStamp, prevHash, data);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    // * returning values
    return new this({
      nonce,
      difficulty,
      timeStamp,
      prevHash,
      data,
      hash,
    });
  }

  // * to adjust difficulty based on mining rate
  static adjustDifficulty({ originalBlock, timeStamp }) {
    // * getting difficulty from the passed block
    let { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    // * calculating current mining rate
    const diff = timeStamp - originalBlock.timeStamp;

    if (diff < MINE_RATE) return difficulty++;
    else return difficulty--;
  }
}

module.exports = Block;
