[![Build Status](https://travis-ci.org/michiel/sequencer-js.png)](https://travis-ci.org/michiel/sequencer-js)

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

Code
----

The code is all written using 1990s capabilities ECMAScript/262 (apart from the
CommonJS 'require' convention). In theory that means you can go back in time
and run it on really old JavaScript runtimes. In practice it means that it will
also work in IE and all the horrid forms in which it presents itself to us
today.

There is also a Ruby implementation of the sequencer pattern (that lags behind
this one) at https://github.com/michiel/sequencer-rb .

Examples
--------

Examples can be found in the source examples/ directory. Each example can be run from the commandline. Ex,

    ~/src/sequencer-js/examples$ node ex01-sequence-100-async-calls.js

The Sequencer patterns
----------------------

Sequencing deals with common problems related to ordering asynchronous
functions. The primary one is decoupling flow control from functions. The
secondary problem is executing tasks that are inter-dependant serially and
tasks that are not in parallel. (The sequence method and collect/pipeline
methods, respectively). Additionally it should be trivial to mix async and sync
functions.

This is accomplished by keeping each discrete piece of functionality inside its
own closure and having these closures take an argumentless callback function as
their sole parameter.

For example,

    doAsyncA(function() {
      doAsyncB(function() {
        doAsyncC(function() {
          console.log("All done");
        });
      };
    };

can be written using the basic sequence function as,

    function doAsyncA(callback) {
      callback();
    };
    function doAsyncB(callback) {
      callback();
    };
    function doAsyncC(callback) {
      callback();
    };

    sequence([
      doAsyncA,
      doAsyncB,
      doAsyncC
    ]);

This is a bit more verbose than the original version, but apart from the
advantages that should later become apparent, it is already easier to read and
refactor. For example, changing the order or doAsyncB and doAsyncC is a matter
of re-ordering the elements in the array.

    sequence([
      doAsyncA,
      doAsyncB,
      doAsyncC
    ]);

Becomes,

    sequence([
      doAsyncA,
      doAsyncC,
      doAsyncB
    ]);

The same goes for removing or adding new items.

### sequence ###

The sequence function is for ordering calls that have to be executed sequentially (i.e. calls that are interdependant).

### collect ###

The collect function is for parallelization of calls that are not interdependant. It takes a seperate callback function to invoke on completion. It can be mixed with multiple sequence or collect calls to provide calling scheduling similar to Thread.join(). After completion of all calls a final callback will be invoked.

### pipeline ###

The pipeline function is for maximum perfomance when executing calls that are not interdependant. Calls will be executed until there are no other slots available. Pipeline execution will continue until all calls have been executed. After completion of all calls a final callback will be invoked.


TODO
----

 - More documentation
 - More tests
 - Extend the basic implementations with start/stop/etc fluff
 - Write up a rationale on error handling
 - Possibly some inline docs





