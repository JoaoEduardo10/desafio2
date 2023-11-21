import mongoose from 'mongoose';

class MongoConnect {
  private username: string;
  private password: string;
  private uri: string;
  private mongoose = mongoose;

  constructor() {
    this.username = `${process.env.MONGO_USER}`;
    this.password = `${process.env.MONGO_PASSWORD}`;
    this.uri = `${process.env.MONGO_URI}`;
    this.mongoose = mongoose;
  }

  async connect() {
    this.mongoose.set('strictQuery', true);

    await mongoose.connect(this.uri, {
      auth: { password: this.password, username: this.username },
    });
  }
}

export { MongoConnect };
