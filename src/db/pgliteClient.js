import { PGliteWorker } from '@electric-sql/pglite/worker';

const db = new PGliteWorker(
  new Worker(new URL('./pglite-worker.js', import.meta.url), {
    type: 'module',
  })
);

export default db;
