
var pipeline = require('sequencer').pipeline;

var asyncCalls = [];

for (var i=0; i<100; i++) {
  (function(offset) {
      asyncCalls.push(function(callback) {
          setTimeout(function() {
              console.log("Finished asyncCall " + offset);
            },
            Math.floor(Math.random() * 1000))
        });
  })(i);
}

pipeline(
  asyncCalls,
  function(cb) {
    console.log("Finished pipeline");
  },
  10
);


