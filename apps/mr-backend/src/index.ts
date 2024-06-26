import { buildServer } from './server';

const server = buildServer({ logger: true });

const host = '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

server.listen({ host, port }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
