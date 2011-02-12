# sequencer-js

Library functions for various sequencing related patterns.

There are three main functions.

 - sequence, performs arbitrary sync/async calls in sequence, the final callback is the last in the sequence
 - collect, performs arbitrary sync/async calls in parallel and ends with a final callback
 - pipeline, performs arbitrary sync/async calls in parallel as long as there are slots available and ends with a final callback

Install
-------

Using npm,

    ~$ npm install sequencer

Example sequence
----------------

    //
    // Sequence 10000 async calls
    // 

    var sequencer = require('sequencer');

    //
    // Build an array with 10000 sequencable async calls
    //

    var asyncCalls = [];

    for (var i=0;i<10000;i++) {
      (function(no) {
          asyncCalls.push(
            function(callback) {
              console.log("Call #" + no);
              setTimeout(callback, 1);
            }
          );
        })(i);
    }

    sequencer.sequence(asyncCalls);

Example collect
---------------

    //
    // Sequence 10000 async calls in blocks of 500
    // 

    var sequencer = require('sequencer');

    //
    // Build an array with 10000 sequencable async calls
    //

    var asyncCalls = [];

    for (var i=0;i<10000;i++) {
      (function(no) {
          asyncCalls.push(
            function(callback) {
              // console.log("Call #" + no);
              setTimeout(callback, 200); // Simulate async
            }
          );
        })(i);
    }

    //
    // Chop the 10000 calls into blocks of 500
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
                  // console.log("Finished block #" + offset);
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


Example pipeline
----------------

    //
    // Sequence 10000 async calls in a pipeline, with max 500 open
    // 

    var sequencer = require('sequencer');

    //
    // Build an array with 10000 sequencable async calls
    //

    var asyncCalls = [];

    for (var i=0;i<10000;i++) {
      (function(no) {
          asyncCalls.push(
            function(callback) {
              // console.log("Call #" + no);
              setTimeout(callback, 0); // Simulate async
            }
          );
        })(i);
    }

    sequencer.pipeline(asyncCalls, 500, function() { console.log("All done"); });



