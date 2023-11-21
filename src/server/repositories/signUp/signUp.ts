import { User } from '../../../models/User';
import { Internal_Server_Error } from '../../errors/api-error';
import { ISignUpParams, ISignUpRepository, ISignUpReturn } from './protocols';

class MongoSignUpRepository implements ISignUpRepository {
  private User: typeof User;

  constructor() {
    this.User = User;
  }

  async signUp(params: ISignUpParams): Promise<ISignUpReturn> {
    const { email, nome, senha, telefones } = params;

    if (!email || !nome || !senha || telefones.length <= 0) {
      throw new Internal_Server_Error('Não é possivel criar o usuário');
    }

    const user = await this.User.create({
      nome,
      senha,
      telefones,
      email,
    });

    if (!user) {
      throw new Internal_Server_Error('Não é possivel criar o usuário');
    }

    return {
      id: user._id.toHexString(),
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    };
  }
}

export { MongoSignUpRepository };
