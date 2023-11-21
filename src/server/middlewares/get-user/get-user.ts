import { NextFunction, Request, Response } from 'express';
import { IGetUserParams } from '../../repositories/get-user/protocols';
import { Not_Fould } from '../../errors/api-error';
import { User } from '../../../models/User';

class GetUserMiddleware {
  static async middleware(
    req: Request<IGetUserParams>,
    _res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    if (id.length !== 24) {
      throw new Not_Fould('id invalido');
    }

    const user = await User.findById(id);

    if (!user) {
      throw new Not_Fould('id invalido');
    }

    next();
  }
}

export { GetUserMiddleware };
