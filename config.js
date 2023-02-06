const hashing = require("./hashing");

// * setting initial values for genesis block
const INITIAL_DIFFICULTY = 6,
  MINE_RATE = 1000; // in ms
let nonce = 1,
  timeStamp,
  hash;

// * calculating previous hash with dummy values
const prevHash = hashing(0, 0, 0, "", "");

// * genesis block data
const data = "Block 1";

// * calculating nonce
do {
  nonce++;
  timeStamp = Date.now();
  hash = hashing(nonce, INITIAL_DIFFICULTY, timeStamp, prevHash, data);
} while (
  hash.substring(0, INITIAL_DIFFICULTY) !== "0".repeat(INITIAL_DIFFICULTY)
);

// * genesis block
const GENESIS_DATA = {
  nonce: nonce,
  difficulty: INITIAL_DIFFICULTY,
  timeStamp: timeStamp,
  prevHash: prevHash,
  data: data,
  hash: hash,
};

module.exports = { GENESIS_DATA, MINE_RATE };
