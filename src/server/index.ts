import 'express-async-errors';
import express from 'express';
import { config } from 'dotenv';
import { router } from './router';
import { globalsErrorMiddleware } from './middlewares/globals-errors';

const server = express();
config();
server.use(express.json());
server.use(`${process.env.VERSION}`, router);

server.use(globalsErrorMiddleware);

export { server };
