import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { worker } from '@electric-sql/pglite/worker';

worker({
  async init() {
    const db = await PGlite.create({
      extensions: { live },
      dataDir: 'idb://patients',
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id serial PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        phone TEXT UNIQUE,
        age INTEGER,
        gender TEXT
      );
    `);

    return db;
  },
});
