const { TaskRunner } = require('./indexP');

function emptyFn() {
}

function getFixedNumber() {
  return 1;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100);
}

function buildPromise(fn, rnd) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn());
      } catch (e) {
        reject(e);
      }
    }, rnd());
  });
}

function getPromises(no = 100, fn = emptyFn, rndFn = getFixedNumber) {
  const arr = [];
  for (let i = 0; i < no; i += 1) {
    arr.push(buildPromise(fn, rndFn));
  }
  return arr;
}

describe('TaskRunner', () => {
  it('does a thing', () => {
    const promises = getPromises(100);
    const runner = new TaskRunner(promises);
    return expect(runner.sequence()).resolves.toHaveLength(100);
  });

  it('does a thing randomly', () => {
    const promises = getPromises(100, emptyFn, getRandomNumber);
    const runner = new TaskRunner(promises);
    return expect(runner.sequence()).resolves.toHaveLength(100);
  });
});
