import { Client } from 'pg';

const query = async (query: string | QueryObject) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
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
  query: query,
};

export interface QueryObject<T extends any[] = any[]> {
  text: string;
  values: T;
}
