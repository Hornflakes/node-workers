const { mergeSort } = require('./merge-sort');
const { workerData, parentPort } = require('worker_threads');

const sortedArr = mergeSort(workerData.arr);
parentPort.postMessage({ sortedArr: sortedArr, arrNum: workerData.arrNum });
