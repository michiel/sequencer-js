
var sequence = require('sequencer').sequence;

var asyncCall = function(callback) {
  console.log("Finished asyncCall");
  callback();
}

var seq = [
  asyncCall,
  asyncCall,
  asyncCall,
  asyncCall,
  asyncCall,
  function(cb) {
    console.log("Finished sequence");
  }
];

sequence(seq);

