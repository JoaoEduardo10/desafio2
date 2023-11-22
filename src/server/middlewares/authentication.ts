/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../errors/api-error';
import { compareJwt } from '../helpers/jsonwebtoken';
import { IGetUserParams } from '../repositories/get-user/protocols';

export class AuthenticationMiddleware {
  static async middleware(
    req: Request<IGetUserParams>,
    _res: Response,
    next: NextFunction,
  ) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new Unauthorized('Não autorizado');
    }

    const [type, token_auth] = authorization.split(' ');

    if (type != 'Bearer') {
      throw new Unauthorized('Não autorizado');
    }

    try {
      const token = compareJwt(token_auth);

      if (token == undefined) {
        throw new Unauthorized('Sessão inválida');
      }

      next();
    } catch (error: any) {
      throw new Unauthorized(error.message);
    }
  }
}
