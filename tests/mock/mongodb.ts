import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../src/models/User';

export class MockMongo {
  private User: typeof User;
  private mongod: ReturnType<typeof MongoMemoryServer.create>;

  constructor() {
    this.User = User;
    this.mongod = MongoMemoryServer.create();
  }

  async connect() {
    const uri = (await this.mongod).getUri();

    await mongoose.connect(uri);
  }

  async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await this.mongod).stop();
  }

  async clearDatabase() {
    await this.User.deleteMany();
  }
}
