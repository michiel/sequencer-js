var sequence = require('sequencer').sequence;

var testCase = require('nodeunit').testCase;

module.exports = testCase({

    sequencer_test_001: function (test) {
      var counter = 0;

      var asyncCall = function(callback) {
        // console.log("Finished asyncCall");
        counter++;
        callback();
      }

      var seq = [
        asyncCall,
        asyncCall,
        asyncCall,
        asyncCall,
        asyncCall,
        function(cb) {
          // console.log("Finished sequence");
          test.equals(counter, 5);
          test.done();
        }
      ];

      sequence(seq);
    }

});

