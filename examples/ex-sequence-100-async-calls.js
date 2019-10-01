//
// Example #1 : sequence 100 async calls
//

const { sequence } = require('sequencer');

//
// Build an array with 100 sequencable async calls
//

const asyncCalls = [];

for (let i = 0; i < 100; i++) {
  (function (no) {
    asyncCalls.push(
      (callback) => {
        console.log(`Call #${no}`);
        setTimeout(callback, 1);
      },
    );
  }(i));
}

asyncCalls.push((callback) => {
  console.log('Finished');
  callback && callback();
});

sequence(asyncCalls);
