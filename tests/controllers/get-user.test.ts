import { describe, expect, it } from 'vitest';
import {
  IGetUserParams,
  IGetUserRepository,
} from '../../src/server/repositories/get-user/protocols';
import { IApiRequest } from '../../src/server/controllers/protocols';
import { GetUserController } from '../../src/server/controllers/get-user/get-user';
import { UserDTO } from '../../src/interface/user';

class MockGetUserRepository implements IGetUserRepository {
  private user: UserDTO;

  constructor() {
    this.user = {
      id: '1234',
      nome: 'Nome do Usuário',
      email: 'test@gmail.com',
      senha: '1234',
      telefones: [{ numero: '123456789', ddd: '11' }],
      data_criacao: new Date('2023-01-01T12:00:00Z'),
      data_atualizacao: new Date('2023-01-02T12:30:00Z'),
      token: 'token_gerado',
      ultimo_login: new Date('2023-01-02T12:15:00Z'),
    };
  }

  async get(params: IGetUserParams): Promise<UserDTO> {
    const { id } = params;

    if (id == this.user.id) {
      return this.user;
    }

    throw new Error('Method not implemented.');
  }
}

const req_one: IApiRequest<unknown> = {
  params: {
    id: '1234',
  },
};

const req_two = {
  params: {},
};

describe('get-user', () => {
  it('should return user', async () => {
    const repository = new MockGetUserRepository();
    const controller = new GetUserController(repository);

    const { body, statusCode } = await controller.handle(req_one);

    expect(body.id).toBe(req_one.params.id);
    expect(statusCode).toBe(200);
  });

  it('should not return user', async () => {
    const repository = new MockGetUserRepository();
    const controller = new GetUserController(repository);

    try {
      const { body } = await controller.handle(req_two);

      expect(body.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel buscar o usuário',
      );
    }
  });
});
