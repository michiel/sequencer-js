//
// Example : collect 100 parallel async calls
// 

var collect = require('sequencer').collect;

//
// Get a pseudo random number to simulate async variability
// 

var randomNumber = function() {
  return Math.floor(Math.random() * 100);
}

//
// Build an array with 100 sequencable async calls
//

var asyncCalls = [];

for (var i=0;i<100;i++) {
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
// Add a finishing function at the end
//

asyncCalls.push(function(callback) {
    console.log("Finished all tasks");
  });

collect(asyncCalls);

