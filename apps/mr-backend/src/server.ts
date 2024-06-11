import fastify from 'fastify';
import statusRoutes from './api/v1/status';
import migrationRoutes from './api/v1/migrations';

export interface ServerOptions {
  logger: boolean;
}

const defaultOptions: ServerOptions = { logger: false };

export const buildServer = (opts?: ServerOptions) => {
  opts = opts ?? defaultOptions;
  const server = fastify({ ...defaultOptions, ...opts });

  server.register(statusRoutes);
  server.register(migrationRoutes);

  return server;
};
