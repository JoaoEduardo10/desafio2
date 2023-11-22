import 'express-async-errors';
import express from 'express';
import { config } from 'dotenv';
import { router } from './router';
import { globalsErrorMiddleware } from './middlewares/globals-errors';
import swagger from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

const server = express();
config();
server.use(express.json());
server.use(`${process.env.VERSION}`, router);

server.use(
  `${process.env.VERSION}/desafio2/documentation`,
  swagger.serve,
  swagger.setup(swaggerDocs),
);

server.use(globalsErrorMiddleware);

export { server };
