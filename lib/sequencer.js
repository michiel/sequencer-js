
exports.sequence = function(actions) {
  var self = function() {
    actions.length && actions.shift()(self);
  }
  self();
}

exports.collect = function(actions, finalCallback) {
  var size = actions.length;

  for (var i=0; i<actions.length; i++) {
    actions[i](function() {
        if (--size == 0) {
          // console.log("Finished block");
          finalCallback();
        }
      }
    );
  }
}

exports.pipeline = function(actions, maxOpenCalls, finalCallback) {

  var openCalls = 0;

  function callback() {
    if (--openCalls < maxOpenCalls) {
      launch();
    }
  }

  function launch() {
    if (actions.length != 0) {
      do {
        openCalls++;
        actions.shift()(callback);
      } while (openCalls < maxOpenCalls);
    } else if ((actions.length == 0) && (openCalls == 0)){
      // console.log("Finished all calls");
      finalCallback();
    } else {
      // console.log("Too many calls open, waiting");
    }
  }

  var initial = (maxOpenCalls > actions.length) ? maxOpenCalls : actions.length;

  for (var i=0; i<initial; i++) {
    launch();
  }
}


