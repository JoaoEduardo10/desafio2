import { Request, Response } from 'express';
import { MongoSignUpRepository } from '../repositories/signUp/signUp';
import { SignUpController } from '../controllers/login/signUp';

class SignUpRouter {
  static async signUp(req: Request, res: Response) {
    const mongoSignUpRepository = new MongoSignUpRepository();
    const signUpController = new SignUpController(mongoSignUpRepository);

    const { body, statusCode } = await signUpController.handle(req);

    res.status(statusCode).json(body);
  }
}

export { SignUpRouter };
