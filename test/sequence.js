var sequence = require('sequencer').sequence;

var testCase = require('nodeunit').testCase;

module.exports = testCase({

    sequencer_test_001_basic: function (test) {
      var counter = 0;

      var asyncCall = function(callback) {
        counter++;
        setTimeout(callback, Math.floor(Math.random() * 100));
      }

      sequence([
        asyncCall,
        asyncCall,
        asyncCall,
        asyncCall,
        asyncCall,
        function(cb) {
          test.equals(counter, 5);
          test.done();
        }
        ]
      );
    },

    sequencer_test_002_nested: function (test) {
      var counter = 0;

      var asyncCall = function(callback) {
        counter++;
        setTimeout(callback, Math.floor(Math.random() * 100));
      }

      sequence([
        asyncCall,
        asyncCall,
        asyncCall,
        function(cb) {
          sequence([
            asyncCall,
            asyncCall,
            function(cb) {
              test.equals(counter, 5);
              test.done();
              cb && cb();
            },
            cb
            ]);
        }
        ]
      );
    },

    sequencer_test_003_nested: function (test) {
      var counter = 0;

      var asyncCall = function(callback) {
        counter++;
        setTimeout(callback, Math.floor(Math.random() * 100));
      }

      sequence([
        asyncCall,
        asyncCall,
        function(cb) {
          sequence([
            asyncCall,
            function(cb) {
              sequence([
                asyncCall,
                asyncCall,
                function(cb) {
                  cb && cb();
                },
                cb
                ]);
            },
            function(cb) {
              test.equals(counter, 5);
              test.done();
              cb && cb();
            },
            cb
            ]);
        }
        ]
      );
    }

});

