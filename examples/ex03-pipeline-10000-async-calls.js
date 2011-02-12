//
// Example #3 : sequence 10000 async calls in a pipeline, with max 500 open
// 

var sequencer = require('sequencer');

//
// Get a pseudo random number to simulate async variability
// 

var randomNumber = function() {
  return Math.floor(Math.random() * 1000);
}

//
// Build an array with 10000 sequencable async calls
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

sequencer.pipeline(
  asyncCalls, 
  function() { console.log("All done"); },
  500
);


