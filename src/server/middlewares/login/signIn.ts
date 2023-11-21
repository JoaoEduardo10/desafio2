/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import { ISignInParams } from '../../repositories/SignIn/protocols';
import { Bad_Request, Unauthorized } from '../../errors/api-error';
import { User } from '../../../models/User';
import validator from 'validator';

class SignInMiddleware {
  static async middleware(
    req: Request<{}, {}, ISignInParams>,
    _res: Response,
    next: NextFunction,
  ) {
    const { email, senha } = req.body;

    if (!email) {
      throw new Bad_Request('Adicione o email');
    }

    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Bad_Request('formato de email invalido');
    }

    if (!senha) {
      throw new Bad_Request('Adicione uma senha');
    }

    const isLogged = await User.findOne({ email, senha });

    if (!isLogged) {
      throw new Unauthorized('Usuário e/ou senha inválidos');
    }

    next();
  }
}

export { SignInMiddleware };
