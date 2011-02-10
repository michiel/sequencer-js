# sequencer-js

Library functions for various sequencing related patterns.

There are three main functions.

 - sequence, performs arbitrary sync/async calls in sequence, the final callback is the last in the sequence
 - collect, performs arbitrary sync/async calls in parallel and ends with a final callback
 - pipeline, performs arbitrary sync/async calls in parallel as long as there are slot available and ends with a final callback


