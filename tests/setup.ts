import 'dotenv/config';
import { MockMongo } from './mock/mongodb';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import supertest from 'supertest';
import { server } from '../src/server';

const mockMongo = new MockMongo();

const serverTest = supertest(server);

beforeAll(async () => {
  await mockMongo.connect();
});

afterEach(async () => {
  await mockMongo.clearDatabase();
});

afterAll(async () => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  await mockMongo.closeDatabase();
});

export { serverTest };
