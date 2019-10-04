function assertPromise(o) {
  if (!(o instanceof Promise)) {
    throw new Error('Task is not a Promise');
  }
}

function assertAllPromises(arr) {
  arr.forEach(assertPromise);
}

class TaskRunner {
  constructor(tasks) {
    assertAllPromises(tasks);
    this.tasks = tasks;
  }

  sequence() {
    return new Promise((resolve, reject) => {
      const arr = [];
      const run = () => {
        if (this.tasks.length > 0) {
          const task = this.tasks.pop();
          task.then((res) => {
            arr.push(res);
            run();
          }).catch((msg) => {
            reject(msg);
          });
        } else {
          resolve(arr);
        }
      };
      run();
    });
  }
}

module.exports = {
  TaskRunner,
};
