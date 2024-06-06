import fastify from 'fastify';
import statusRoutes from './api/v1/status';
import migrationRoutes from './api/v1/migrations';

const server = fastify({ logger: true });

server.register(statusRoutes);
server.register(migrationRoutes);

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

server.listen({ host, port }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
