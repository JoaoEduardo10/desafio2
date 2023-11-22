import { describe, expect, it } from 'vitest';
import {
  ISignInParams,
  ISignInRepository,
  ISignInReturn,
} from '../../src/server/repositories/SignIn/protocols';
import { IApiRequest } from '../../src/server/controllers/protocols';
import { SignInController } from '../../src/server/controllers/login/signIn';
import { UserDTO } from '../../src/interface/user';
import { v4 as uuid } from 'uuid';

class MockSignInRepository implements ISignInRepository {
  private users: UserDTO[];

  constructor() {
    this.users = [
      {
        id: uuid(),
        nome: 'Nome do Usuário',
        email: 'test@gmail.com',
        senha: '1234',
        telefones: [{ numero: '123456789', ddd: '11' }],
        data_criacao: new Date('2023-01-01T12:00:00Z'),
        data_atualizacao: new Date('2023-01-02T12:30:00Z'),
        token: 'token_gerado',
        ultimo_login: new Date('2023-01-02T12:15:00Z'),
      },
    ];
  }

  async signIn(params: ISignInParams): Promise<ISignInReturn> {
    const { email, senha } = params;

    const [user] = this.users.filter(
      (user) => user.email == email && user.senha == senha,
    );

    return {
      id: user.id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    };
  }
}

const req_one: IApiRequest<ISignInParams> = {
  body: {
    email: 'test@gmail.com',
    senha: '1234',
  },
};

const req_two = {};

describe('signIn', () => {
  it('should return user logged with status code 200', async () => {
    const repository = new MockSignInRepository();
    const controller = new SignInController(repository);

    const { body, statusCode } = await controller.handle(req_one);

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
  });

  it('should not create the user by not adding a body to the request', async () => {
    const repository = new MockSignInRepository();
    const controller = new SignInController(repository);

    try {
      const { body } = await controller.handle(req_two);

      expect(body.token).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel autenticar o usuário',
      );
    }
  });
});
