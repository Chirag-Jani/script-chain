const crypto = require("crypto");

// * hashing

// ? ...input means that it can receive variable inputs and we don't need to define as a parameter for each new input

const generateHash = (...input) => {
  // * getting sha256 algo
  const hash = crypto.createHash("sha256");

  // * sorting inputs and joining
  hash.update(input.sort().join(""));

  // * returning hash
  return hash.digest("hex");
};

module.exports = generateHash;
