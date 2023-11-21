/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import { ISignUpParams } from '../../repositories/signUp/protocols';
import { Bad_Request } from '../../errors/api-error';
import { User } from '../../../models/User';
import validator from 'validator';

class SignUpMiddleware {
  static async middleware(
    req: Request<{}, {}, ISignUpParams>,
    _res: Response,
    next: NextFunction,
  ) {
    const { email, nome, senha, telefones } = req.body;

    if (!email) {
      throw new Bad_Request('Adicione o email');
    }

    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      throw new Bad_Request('formato de email invalido');
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Bad_Request('E-email já existente');
    }

    if (!nome) {
      throw new Bad_Request('Adicione o nome');
    }

    if (!senha) {
      throw new Bad_Request('Adicione uma senha');
    }

    if (!telefones || telefones.length <= 0) {
      throw new Bad_Request('Adicione pelo menos um telefone');
    }

    for await (const telefone of telefones) {
      if (!telefone.ddd) {
        throw new Bad_Request('Adicione o ddd');
      }

      if (!telefone.numero) {
        throw new Bad_Request('Adicione o numero');
      }
    }

    next();
  }
}

export { SignUpMiddleware };
