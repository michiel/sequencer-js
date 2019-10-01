//
// Example : sequence 10000 async calls in blocks of 500
//

const sequencer = require('sequencer');

//
// Get a pseudo random number to simulate async variability
//

const randomNumber = function () {
  return Math.floor(Math.random() * 100);
};

//
// Build an array with 10k sequencable async calls
//

const asyncCalls = [];

for (var i = 0; i < 10000; i++) {
  (function (no) {
    asyncCalls.push(
      (callback) => {
        console.log(`Call #${no}`);
        setTimeout(callback, randomNumber()); // Simulate async
      },
    );
  }(i));
}

//
// Chop the 10k calls into blocks of max 500
//

const BLOCKSIZE = 500;
const blocks = [];

do {
  blocks.push(asyncCalls.splice(0, BLOCKSIZE));
} while (asyncCalls.length != 0);

//
// Build a new sequence for collecting each block
//

const sequenceCalls = [];

for (var i = 0; i < blocks.length; i++) {
  (function (offset) {
    sequenceCalls.push(
      (callback) => {
        sequencer.collect(blocks[offset], () => {
          console.log(`Finished block #${offset}`);
          callback();
        });
      },
    );
  }(i));
}

//
// Add a finishing function at the end
//

sequenceCalls.push((callback) => {
  console.log('Finished all tasks');
});

sequencer.sequence(sequenceCalls);
