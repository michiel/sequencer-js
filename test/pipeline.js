
var pipeline = require('sequencer').pipeline;

var asyncCalls = [];

for (var i=0; i<10000; i++) {
  (function(offset) {
      asyncCalls.push(function(callback) {
          setTimeout(function() {
              console.log("Finished asyncCall " + offset);
              callback();
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
  500
);


