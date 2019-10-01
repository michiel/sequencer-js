const { sequence, pipeline, collect } = require('./index');

function emptyFn() {
}

function getFixedNumber() {
  return 1;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}


function buildCallback(fn, rnd) {
  return (callback) => {
    fn();
    setTimeout(callback, rnd());
  };
}

function getCallback(no = 100, fn = emptyFn, rndFn = getFixedNumber) {
  const arr = [];
  for (let i = 0; i < no; i += 1) {
    arr.push(buildCallback(fn, rndFn));
  }
  return arr;
}

describe('sequence()', () => {
  it('does a thing', () => {
    const expectedValue = 100;
    const test = new Promise((resolve) => {
      let counter = 0;
      const fn = () => { counter += 1; };
      const asyncCalls = getCallback(expectedValue, fn);
      asyncCalls.push(() => { resolve(counter); });
      sequence(asyncCalls);
    });
    return expect(test).resolves.toEqual(expectedValue);
  });
});

describe('pipeline()', () => {
  it('does a thing', () => {
    const expectedValue = 10000;
    const test = new Promise((resolve) => {
      let counter = 0;
      const fn = () => { counter += 1; };
      const asyncCalls = getCallback(expectedValue, fn);
      pipeline(asyncCalls, () => { resolve(counter); }, 500);
    });
    return expect(test).resolves.toEqual(expectedValue);
  });
});

describe('collect()', () => {
  it('does a thing', () => {
    const expectedValue = 10000;
    const test = new Promise((resolve) => {
      let counter = 0;
      const fn = () => { counter += 1; };
      const asyncCalls = getCallback(expectedValue, fn, getRandomNumber);
      collect(asyncCalls, () => { resolve(counter); });
    });
    return expect(test).resolves.toEqual(expectedValue);
  });
});
