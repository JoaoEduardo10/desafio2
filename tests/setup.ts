import 'dotenv/config';
import { MockMongo } from './mock/mongodb';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

const mockMongo = new MockMongo();

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
