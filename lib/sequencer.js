
var emptyCallback = function(cb) {
  cb && cb();
}

exports.sequence = function(actions) {
  var self = function() {
    actions.length && actions.shift()(self);
  }
  self();
}

exports.collect = function(actions, finalCallback) {
  var size    = actions.length;
  var finalcb = finalCallback || emptyCallback;

  for (var i=0; i<actions.length; i++) {
    actions[i](function() {
        if (--size == 0) {
          // console.log("Finished block");
          finalcb();
        }
      }
    );
  }
}

exports.pipeline = function(actions, finalCallback, maxOpenCalls) {

  var openCalls = 0;
  var finalcb   = finalCallback || emptyCallback;
  var maxOpen   = maxOpenCalls  || Infinity;

  function callback() {
    if (--openCalls < maxOpen) {
      launch();
    }
  }

  function launch() {
    if (actions.length != 0) {
      do {
        openCalls++;
        actions.shift()(callback);
      } while (openCalls < maxOpen);
    } else if ((actions.length == 0) && (openCalls == 0)){
      // console.log("Finished all calls");
      finalcb();
    } else {
      // console.log("Too many calls open, waiting");
    }
  }

  var initial = (maxOpen > actions.length) ? maxOpen : actions.length;

  for (var i=0; i<initial; i++) {
    launch();
  }
}


