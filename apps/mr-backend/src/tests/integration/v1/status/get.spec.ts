import { FastifyInstance } from 'fastify';
import { buildServer } from '~/mr-backend/server';

let server: FastifyInstance;

beforeAll(() => (server = buildServer()));

test('GET to /v1/status should return 200', async () => {
  const response = await server.inject().get('/v1/status');
  const { dependencies } = response.json();

  expect(response.statusCode).toBe(200);
  // expect(isISODate(response.data.updated_at)).toBe(true);
  expect(dependencies.database.version).toBe('16.0');
  expect(dependencies.database.max_connections).toBe(100);
  expect(dependencies.database.open_connections).toBe(1);
});

afterAll(() => server.close());
