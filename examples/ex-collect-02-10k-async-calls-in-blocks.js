//
// Example : sequence 10000 async calls in blocks of 500
// 

var sequencer = require('sequencer');

//
// Get a pseudo random number to simulate async variability
// 

var randomNumber = function() {
  return Math.floor(Math.random() * 100);
}

//
// Build an array with 10k sequencable async calls
//

var asyncCalls = [];

for (var i=0;i<10000;i++) {
  (function(no) {
      asyncCalls.push(
        function(callback) {
          console.log("Call #" + no);
          setTimeout(callback, randomNumber()); // Simulate async
        }
      );
    })(i);
}

//
// Chop the 10k calls into blocks of max 500
//

var BLOCKSIZE = 500;
var blocks = [];

do {
  blocks.push(asyncCalls.splice(0,BLOCKSIZE));
} while(asyncCalls.length != 0);

//
// Build a new sequence for collecting each block
//

var sequenceCalls = [];

for (var i=0; i<blocks.length; i++) {
  (function(offset) {
      sequenceCalls.push(
        function(callback){
          sequencer.collect(blocks[offset], function() {
              console.log("Finished block #" + offset);
              callback();
            });
        })
    })(i);
}

//
// Add a finishing function at the end
//

sequenceCalls.push(function(callback) {
    console.log("Finished all tasks");
  });

sequencer.sequence(sequenceCalls);

