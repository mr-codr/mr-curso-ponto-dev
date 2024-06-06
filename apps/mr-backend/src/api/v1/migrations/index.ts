import { FastifyPluginCallback } from 'fastify';
import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';

const routes: FastifyPluginCallback = async (fastify) => {
  fastify.get('/v1/migrations', async () => {
    const dir = join('apps', 'mr-backend', 'src', 'infra', 'migrations');
    const migrations = await migrationRunner({
      dir,
      databaseUrl: process.env.DATABASE_URL,
      direction: 'up',
      migrationsTable: 'pgmigrations',
      dryRun: true,
    });

    return migrations;
  });

  fastify.post('/v1/migrations', async () => {
    const dir = join('apps', 'mr-backend', 'src', 'infra', 'migrations');
    const migrations = await migrationRunner({
      dir,
      databaseUrl: process.env.DATABASE_URL,
      direction: 'up',
      migrationsTable: 'pgmigrations',
      dryRun: true,
    });

    return migrations;
  });
};

export default routes;
