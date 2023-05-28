const os = require('os');
const { Worker } = require('worker_threads');

const hash = '16cf868a5020546dc8b3ba16b37dc3ff';
const maxNumber = 10_000_000;
const threadsCount = os.cpus().length;
const numbersPerWorker = Math.round(maxNumber / threadsCount);
const workers = [];

console.log('hash:', hash);
console.time('cracked in');
let i = 0;
while (i < threadsCount) {
  const worker = new Worker('./worker.js', {
    workerData: { start: i * numbersPerWorker, end: ++i * numbersPerWorker, hash: hash },
  });
  workers.push(worker);
  worker.on('message', (e) => handleWorkerMsg(e));
}

function handleWorkerMsg(e) {
  console.log('----------------');
  console.log('cracked: ' + e);
  console.log('----------------');
  console.timeEnd('cracked in');
  workers.forEach((w) => w.terminate());
}
