import { MongoConnect } from './database/mongo';
import 'dotenv/config';

class ServerInit {
  static async init() {
    const mongoConnect = new MongoConnect();

    mongoConnect
      .connect()
      .then(() => {
        console.log('server on');
      })
      .catch((error) => {
        console.log(`não foi possivel se conectar ao banco: ${error.message}`);
      });
  }
}

ServerInit.init();
