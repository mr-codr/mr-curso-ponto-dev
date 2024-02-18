import axios from 'axios';
import { isISODate } from '@mr/util/date';

test('GET to /v1/status should return 200', async () => {
  const response = await axios.get('http://localhost:3000/v1/status');
  const { dependencies } = response.data;

  expect(response.status).toBe(200);

  expect(isISODate(response.data.updated_at)).toBe(true);
  expect(dependencies.database.version).toBe('16.0');
  expect(dependencies.database.max_connections).toBe(100);
  expect(dependencies.database.open_connections).toBe(1);
});
