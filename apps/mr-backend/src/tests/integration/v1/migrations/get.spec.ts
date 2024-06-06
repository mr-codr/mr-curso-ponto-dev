import axios from 'axios';

test('GET to /v1/migrations should return 200', async () => {
  const response = await axios.get('http://localhost:3000/v1/migrations');
  expect(response.status).toBe(200);

  const data: any[] = response.data;
  console.log('from get: ', data);
  expect(Array.isArray(data)).toBe(true);
});
