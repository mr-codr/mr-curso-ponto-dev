import { database } from '../../../../infra/database';
import { buildServer } from '~/mr-backend/server';
import { FastifyInstance } from 'fastify';

let server: FastifyInstance;

const cleanDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;');
};

beforeAll(async () => {
  await cleanDatabase();
  server = buildServer();
});

test('POST to /v1/migrations should return 200', async () => {
  const response1 = await server.inject().post('/v1/migrations');
  const response2 = await server.inject().post('/v1/migrations');

  expect(response1.statusCode).toBe(201);
  expect(response2.statusCode).toBe(200);

  const data1: any[] = response1.json();
  const data2: any[] = response2.json();
  expect(Array.isArray(data1)).toBe(true);
  expect(Array.isArray(data2)).toBe(true);
  expect(data1.length).toBeGreaterThan(0);
  expect(data2.length).toBe(0);
});

afterAll(() => server.close());
