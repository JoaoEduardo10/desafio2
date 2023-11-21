import express from 'express';
import { config } from 'dotenv';

const server = express();
config();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('ok');
});

export { server };
