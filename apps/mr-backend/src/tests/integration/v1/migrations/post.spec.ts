test('POST to /v1/migrations should return 200', async () => {
  const response = await fetch('http://localhost:3000/v1/migrations', {
    method: 'POST',
  });
  expect(response.status).toBe(200);

  const data: any[] = await response.json();
  console.log('from post: ', data);
  expect(Array.isArray(data)).toBe(true);
});
