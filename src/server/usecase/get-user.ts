import { Request, Response } from 'express';
import { MongoGetUserRepository } from '../repositories/get-user/get-user';
import { GetUserController } from '../controllers/get-user/get-user';
import { IGetUserParams } from '../repositories/get-user/protocols';

class GetUserRouter {
  static async get(req: Request<IGetUserParams>, res: Response) {
    const mongoGetUserRepository = new MongoGetUserRepository();

    const getUserController = new GetUserController(mongoGetUserRepository);

    const { body, statusCode } = await getUserController.handle(req);

    res.status(statusCode).json(body);
  }
}

export { GetUserRouter };
