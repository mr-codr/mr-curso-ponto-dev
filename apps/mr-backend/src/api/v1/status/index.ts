import { database } from '../../../infra/database';
import { FastifyPluginCallback } from 'fastify';

const routes: FastifyPluginCallback = async (fastify) => {
  fastify.get('/v1/status', async () => {
    const updatedAt = new Date().toISOString();
    const dbVersionResult = await database.query('show server_version');
    const dbVersion = dbVersionResult.rows[0].server_version;
    const dbMaxConnectionsResult = await database.query('show max_connections');
    const dbMaxConnections = +dbMaxConnectionsResult.rows[0].max_connections;
    const dbName = process.env.POSTGRES_DB;
    const dbOpenConnectionsResult = await database.query({
      text: 'select count(1) from pg_stat_activity where datname = $1',
      values: [dbName],
    });
    const dbOpenConnections = +dbOpenConnectionsResult.rows[0].count;

    return {
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: dbVersion,
          max_connections: dbMaxConnections,
          open_connections: dbOpenConnections,
        },
      },
    };
  });
};

export default routes;
