// BullMQ UI
const Queue = require('bull');
const QueueMQ = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const emailQueue = new Queue('emailQueue');
const transactionalQueue = new Queue('transactionalQueue');
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue), new BullAdapter(transactionalQueue)],
  serverAdapter: serverAdapter,
});
// BullMQ UI
export { serverAdapter }; // Named export
