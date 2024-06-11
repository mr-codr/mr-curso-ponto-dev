import { FastifyPluginCallback } from 'fastify';
import migrationRunner, { RunnerOption } from 'node-pg-migrate';
import { join } from 'node:path';
import { database } from '~/mr-backend/infra/database';

const dir = join('apps', 'mr-backend', 'src', 'infra', 'migrations');
const migrationOptions: RunnerOption = {
  dir,
  databaseUrl: process.env.DATABASE_URL,
  direction: 'up',
  migrationsTable: 'pgmigrations',
  log: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message);
    }
  },
};

const routes: FastifyPluginCallback = async (fastify) => {
  fastify.get('/v1/migrations', async () => {
    const dbClient = await database.getNewClient();
    const pendingMigrations = await migrationRunner({
      ...migrationOptions,
      dbClient,
      dryRun: true,
    });
    await dbClient.end();
    return pendingMigrations;
  });

  fastify.post('/v1/migrations', async (request, reply) => {
    const dbClient = await database.getNewClient();
    const migratedMigrations = await migrationRunner({
      ...migrationOptions,
      dbClient,
    });
    await dbClient.end();
    if (migratedMigrations.length > 0) {
      reply.code(201);
    }
    return migratedMigrations;
  });
};

export default routes;
