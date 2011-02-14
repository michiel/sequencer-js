var collect = require('sequencer').collect;

var testCase = require('nodeunit').testCase;

module.exports = testCase({

    collect_test_001: function (test) {
      var counter    = 0;
      var asyncCalls = [];

      for (var i=0; i<10000; i++) {
        (function(offset) {
            asyncCalls.push(function(callback) {
                setTimeout(function() {
                    // console.log("Finished asyncCall " + offset);
                    counter++;
                    callback();
                  },
                  Math.floor(Math.random() * 100))
              });
          })(i);
      }

      collect(
        asyncCalls,
        function(cb) {
          // console.log("Finished collection");
          test.equals(counter, 10000);
          test.done();
        }
      );

    }

});


