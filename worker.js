const { workerData, parentPort } = require('worker_threads');
const crypto = require('crypto');

for (let i = workerData.start; i < workerData.end; i++) {
  const hash = crypto.createHash('md5').update(String(i)).digest('hex');
  if (hash === workerData.hash) parentPort.postMessage(i);
}
