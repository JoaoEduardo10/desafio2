/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../../models/User';
import { Internal_Server_Error } from '../../errors/api-error';
import { createJwt } from '../../helpers/jsonwebtoken';
import { ISignInParams, ISignInRepository, ISignInReturn } from './protocols';

class MongoSignInRepository implements ISignInRepository {
  private User: typeof User;
  private jwt: typeof createJwt;

  constructor() {
    this.User = User;
    this.jwt = createJwt;
  }

  async signIn(params: ISignInParams): Promise<ISignInReturn> {
    const { email, senha } = params;

    if (!email || !senha) {
      throw new Internal_Server_Error('Não foi possivel autenticar o usuário');
    }

    const isLogged = await this.User.findOne({ email, senha });

    if (!isLogged) {
      throw new Internal_Server_Error('Não é possivel autenticar o usuário');
    }

    await this.User.findOneAndUpdate(
      { email: isLogged.email },
      {
        data_atualizacao: new Date(),
        ultimo_login: new Date(),
        token: this.jwt({
          email: isLogged.email,
          id: isLogged._id.toHexString(),
          name: isLogged.nome,
        }),
      },
    );

    const user = (await this.User.findOne({ email: isLogged.email })) as any;

    return {
      id: user._id.toHexString(),
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    };
  }
}

export { MongoSignInRepository };
