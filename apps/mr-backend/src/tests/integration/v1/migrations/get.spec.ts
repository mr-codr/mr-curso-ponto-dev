import { FastifyInstance } from 'fastify';
import { database } from '~/mr-backend/infra/database';
import { buildServer } from '~/mr-backend/server';

let server: FastifyInstance;

const cleanDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;');
};

beforeAll(async () => {
  await cleanDatabase();
  server = buildServer();
});

test('GET to /v1/migrations should return 200', async () => {
  const response = await server.inject().get('/v1/migrations');
  expect(response.statusCode).toBe(200);

  const data: any[] = response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});

afterAll(() => server.close());
