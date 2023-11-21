import { beforeEach, describe, expect, it } from 'vitest';
import { serverTest } from '../setup';
import { User } from '../../src/models/User';

describe('signIn', () => {
  beforeEach(async () => {
    await User.create({
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
  });

  it('should return for not adding the email', async () => {
    const { body, statusCode } = await serverTest.post(
      `${process.env.VERSION}/login`,
    );

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione o email' });
  });

  it('should be returned by adding an invalid email format', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/login`)
      .send({
        email: 'test',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'formato de email invalido' });
  });

  it('should return for not adding the senha', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/login`)
      .send({
        email: 'test@email.com',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione uma senha' });
  });

  it('should not log the user in by adding an invalid email', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/login`)
      .send({
        email: 'test@email.com',
        senha: '1234',
      });

    expect(statusCode).toBe(401);

    expect(body).toEqual({ mensagem: 'Usuário e/ou senha inválidos' });
  });

  it('should not log the user in by adding an invalid senha', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/login`)
      .send({
        email: 'test@gmail.com',
        senha: '12344',
      });

    expect(statusCode).toBe(401);

    expect(body).toEqual({ mensagem: 'Usuário e/ou senha inválidos' });
  });
});
