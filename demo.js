const blockchain = require("./blockchain");

const b = new blockchain();

b.addBlock({ data: "Block 1" });

let prevTS, nextTS, nextBlock, timeDiff, avgTime;

const times = [];

for (let i = 0; i < 1000; i++) {
  prevTS = b.chain[b.chain.length - 1].timeStamp;
  b.addBlock({ data: `Block ${i}` });
  nextBlock = b.chain[b.chain.length - 1];
  nextTS = b.chain[b.chain.length - 1].timeStamp;

  timeDiff = nextTS - prevTS;
  times.push(timeDiff);
  avgTime = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Mining time: ${timeDiff}ms, Difficulty: ${nextBlock.difficulty}, AVG time: ${avgTime}ms`
  );
}
