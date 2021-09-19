"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
  "The power of a gun can killz",
  "and the power of fire can burn",
  "the power of wind can chill",
  "and the power of a mind can learn",
  "the power of anger can rage",
  "inside until it tears u apart",
  "but the power of a smile",
  "especially yours can heal a frozen heart",
];

var Blockchain = {
  blocks: [],
};

// Genesis block
Blockchain.blocks.push({
  index: 0,
  hash: "000000",
  data: "",
  timestamp: Date.now(),
});

const createBlock = (index, poemLine) => {
  return Blockchain.blocks.push({
    index: Blockchain.blocks.length,
    hash: blockHash(index.toString(), Blockchain.blocks[index].hash, poemLine, Date.now().toString()),
    prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
    data: poemLine,
    timestamp: Date.now(),
  });
};

// TODO: insert each line into blockchain
for (let [index, line] of poem.entries()) {
  createBlock(index, line);
}
// **********************************

const verifyChain = (Blockchain) => {
  let passed = true;
  let lastHash = "000000";

  Blockchain.blocks.forEach((block, index) => {
    console.log(block);
    const { prevHash, hash } = block;
    const genesisBlock = index === 0;
    const lastBlock = Blockchain.blocks[index - 1];
    // Checks
    if (prevHash !== lastHash && !genesisBlock) return (passed = false);
    if (index === 0 && !genesisBlock) return (passed = false);
    if (!block.prevHash && !genesisBlock) return (passed = false);
    if (index < 0) return (passed = false);
    if (!genesisBlock && prevHash !== lastBlock.hash) return (passed = false);
    lastHash = hash;
  });
  if (passed) return "BLOCKCHAIN VALID! 😄";
  if (!passed) return "BLOCKCHAIN INVALID! 😔";
};

console.log(`Result: ${verifyChain(Blockchain)}`);

function blockHash(index, prevHash, data, timestamp) {
  return crypto.createHash("sha256").update(index, prevHash, data, timestamp).digest("hex");
}
