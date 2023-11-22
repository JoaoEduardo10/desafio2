import { beforeEach, describe, expect, it } from 'vitest';
import {} from '../../src/server/helpers/jsonwebtoken';
import { serverTest } from '../setup';
import { User } from '../../src/models/User';

describe('authentication', () => {
  const user = {
    id: '',
  };

  beforeEach(async () => {
    const get_user = await User.create({
      email: 'test@gmail.com',
      senha: '1234',
      nome: 'test',
      telefones: [
        {
          ddd: '86',
          numero: '123456789',
        },
      ],
    });

    user.id = get_user._id.toHexString();
  });

  it('should return an error for not adding an authorization', async () => {
    const { body, statusCode } = await serverTest.get(
      `${process.env.VERSION}/user/${user.id}`,
    );

    expect(statusCode).toBe(401);
    expect(body).toEqual({ mensagem: 'Não autorizado' });
  });

  it('should return an error for not adding a correct type', async () => {
    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/user/${user.id}`)
      .set('Authorization', 'test');

    expect(statusCode).toBe(401);
    expect(body).toEqual({ mensagem: 'Não autorizado' });
  });

  it('should return an error for not adding a correct type', async () => {
    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/user/${user.id}`)
      .set('Authorization', 'Bearer etest2323234');

    expect(statusCode).toBe(401);
    expect(body).toEqual({ mensagem: 'Sessão inválida' });
  });
});
