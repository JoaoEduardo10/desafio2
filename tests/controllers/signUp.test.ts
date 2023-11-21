import { describe, expect, it } from 'vitest';
import {
  ISignUpParams,
  ISignUpRepository,
  ISignUpReturn,
} from '../../src/server/repositories/signUp/protocols';
import { IApiRequest } from '../../src/server/controllers/protocols';
import { SignUpController } from '../../src/server/controllers/login/signUp';
import { UserDTO } from '../../src/interface/user';
import { v4 as uuid } from 'uuid';

class MockSignUpRepository implements ISignUpRepository {
  private users: UserDTO[];

  constructor() {
    this.users = [];
  }

  public find_user(email: string) {
    return this.users.find((user) => user.email == email);
  }

  private set_user(params: ISignUpParams): ISignUpReturn {
    const { email, nome, senha, telefones } = params;

    const id = uuid();

    this.users.push({
      id,
      nome,
      senha,
      email,
      telefones,
      data_atualizacao: new Date(),
      data_criacao: new Date(),
      token: '',
      ultimo_login: '',
    });

    const [user] = this.users.filter((user) => user.id == id);

    return {
      id: user.id,
      data_atualizacao: user.data_atualizacao,
      data_criacao: user.data_criacao,
      ultimo_login: user.ultimo_login,
      token: user.token,
    };
  }

  async signUp(params: ISignUpParams): Promise<ISignUpReturn> {
    const { email, nome, senha, telefones } = params;

    const user = this.set_user({
      email,
      nome,
      senha,
      telefones,
    });

    return user;
  }
}

const req_one: IApiRequest<ISignUpParams> = {
  body: {
    email: 'test@gmail.com',
    senha: '1234',
    nome: 'test',
    telefones: [
      {
        ddd: '86',
        numero: '123456789',
      },
    ],
  },
};

const req_two = {};

describe('signUp', () => {
  it('should return the user created with status code 201', async () => {
    const repository = new MockSignUpRepository();
    const controller = new SignUpController(repository);

    const user = repository.find_user('test@gmail.com');

    expect(user?.id).not.toBeTruthy();

    const { body, statusCode } = await controller.handle(req_one);

    expect(body.id).toBeTruthy();
    expect(statusCode).toBe(201);
    expect(repository.find_user('test@gmail.com')?.id).toBeTruthy();
  });

  it('should fix a mistake by not adding a body to the request', async () => {
    const repository = new MockSignUpRepository();
    const controller = new SignUpController(repository);

    try {
      const { body } = await controller.handle(req_two);

      expect(body.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Não foi possivel criar o usuário');
    }
  });
});
