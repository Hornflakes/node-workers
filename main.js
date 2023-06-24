const { mergeSort } = require('./merge-sort');
const { Worker } = require('worker_threads');

const max = 100_000;
const arr = [];
for (let i = 0; i < max; i++) {
    arr.push(Math.round(Math.random() * max));
}

console.time('main');
mergeSort(arr);
console.timeEnd('main');

console.time('4 workers');
const workersCount = 4;
const workerArrLen = max / workersCount;
const workers = [];
const sortedArrs = [];
let finishedWorkers = 0;

for (let i = 0, j = 0; i < max; i += workerArrLen, j++) {
    const workerArr = arr.slice(i, i + workerArrLen);
    const worker = new Worker('./worker.js', { workerData: { arr: workerArr, arrNum: j } });
    workers.push(worker);
    worker.on('message', (e) => handleWorkerMsg(e));
}

const handleWorkerMsg = (e) => {
    sortedArrs[e.arrNum] = e.sortedArr;
    finishedWorkers++;

    if (finishedWorkers == workersCount) {
        workers.forEach((w) => w.terminate());

        const sortedArr = [];
        sortedArrs.forEach((arr) => {
            sortedArr.push(...arr);
        });
        console.log(sortedArr);
        console.timeEnd('4 workers');
    }
};
