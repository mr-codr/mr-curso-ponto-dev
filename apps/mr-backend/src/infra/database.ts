import { Client, QueryConfig } from 'pg';

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'production',
  });
  client.connect();
  return client;
};

const query = async (query: string | QueryConfig) => {
  let client: Client;
  try {
    client = await getNewClient();
    const result = await client.query(query);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
};

export const database = {
  getNewClient,
  query,
};
