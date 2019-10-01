function log(/* msg */) {
  // console.debug(`sequencer : ${msg}`);
}

function emptyCallback(cb) {
  if (cb) { cb(); }
}

function sequence(actions) {
  const self = () => {
    if (actions.length) {
      actions.shift()(self);
    }
  };
  self();
}

function collect(actions, finalCallback) {
  let size = actions.length;
  const finalcb = finalCallback || emptyCallback;

  for (let i = 0; i < actions.length; i += 1) {
    actions[i](() => {
      log(`Size is ${size}`);
      size -= 1;
      if (size === 0) {
        log('Finished block');
        finalcb();
      }
    });
  }
}

function pipeline(actions, finalCallback, maxOpenCalls) {
  let openCalls = 0;
  const finalcb = finalCallback || emptyCallback;
  const maxOpen = maxOpenCalls || Infinity;
  let callback;

  function launch() {
    if (actions.length !== 0) {
      do {
        openCalls += 1;
        actions.shift()(callback);
      } while (
        (openCalls < maxOpen)
        && (actions.length !== 0)
      );
    } else if (
      (actions.length === 0)
      && (openCalls === 0)
    ) {
      log('Finished all calls');
      finalcb();
    } else {
      log('Too many calls open, waiting');
    }
  }

  callback = () => {
    openCalls -= 1;
    if (openCalls < maxOpen) {
      launch();
    }
  };

  const initial = (maxOpen > actions.length) ? maxOpen : actions.length;

  for (let i = 0; i < initial; i += 1) {
    launch();
  }
}

module.exports = {
  pipeline,
  collect,
  sequence,
};
