//
// Example #1 : sequence 100 async calls
// 

var sequence = require('sequencer').sequence;

//
// Build an array with 100 sequencable async calls
//

var asyncCalls = [];

for (var i=0;i<100;i++) {
  (function(no) {
      asyncCalls.push(
        function(callback) {
          console.log("Call #" + no);
          setTimeout(callback, 1);
        }
      );
    })(i);
}

asyncCalls.push(function(callback) {
    console.log("Finished");
    callback && callback();
  }
);

sequence(asyncCalls);

