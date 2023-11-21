import { Request, Response } from 'express';
import { MongoSignInRepository } from '../repositories/SignIn/signIn';
import { SignInController } from '../controllers/login/signIn';

class SignInRouter {
  static async signIn(req: Request, res: Response) {
    const mongoSignInRepository = new MongoSignInRepository();
    const signInController = new SignInController(mongoSignInRepository);

    const { body, statusCode } = await signInController.handle(req);

    res.status(statusCode).json(body);
  }
}

export { SignInRouter };
