import { MongoConnect } from './database/mongo';
import { server } from './server';

class ServerInit {
  static async init() {
    const mongoConnect = new MongoConnect();

    mongoConnect
      .connect()
      .then(() => {
        const PORT = process.env.PORT;

        server.listen(PORT, () => console.log('server on'));
      })
      .catch((error) => {
        console.log(`não foi possivel se conectar ao banco: ${error.message}`);
      });
  }
}

ServerInit.init();
