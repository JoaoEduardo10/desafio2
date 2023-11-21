import { UserDTO } from '../../../interface/user';
import { User } from '../../../models/User';
import { Internal_Server_Error } from '../../errors/api-error';
import { IGetUserParams, IGetUserRepository } from './protocols';

class MongoGetUserRepository implements IGetUserRepository {
  private User = User;

  constructor() {
    this.User = User;
  }

  async get(params: IGetUserParams): Promise<UserDTO> {
    const { id } = params;

    if (!id) {
      throw new Internal_Server_Error('Não foi possivel buscar o usuário');
    }

    const user = await this.User.findById(id);

    if (!user) {
      throw new Internal_Server_Error('Não foi possivel buscar o usuário');
    }

    const {
      _id,
      nome,
      email,
      senha,
      telefones,
      data_criacao,
      data_atualizacao,
      token,
      ultimo_login,
    } = user;

    return {
      id: _id.toHexString(),
      nome,
      email,
      senha,
      telefones,
      data_criacao,
      data_atualizacao,
      token,
      ultimo_login,
    };
  }
}

export { MongoGetUserRepository };
