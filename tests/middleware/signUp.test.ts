import { beforeEach, describe, expect, it } from 'vitest';
import { serverTest } from '../setup';
import { User } from '../../src/models/User';

describe('signUp', () => {
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
      `${process.env.VERSION}/user`,
    );

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione o email' });
  });

  it('should be returned by adding an invalid email format', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'formato de email invalido' });
  });

  it('should return an error for adding an existing email', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test@gmail.com',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'E-email já existente' });
  });

  it('should return for not adding the nome', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione o nome' });
  });

  it('should return for not adding the senha', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
        nome: 'test',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione uma senha' });
  });

  it('should return an error for not adding a phone', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
        nome: 'test',
        senha: '123',
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione pelo menos um telefone' });
  });

  it('should return an error for adding a phone with length 0', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
        nome: 'test',
        senha: '123',
        telefones: [],
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione pelo menos um telefone' });
  });

  it('This should return an error for not adding the phone area code', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
        nome: 'test',
        senha: '123',
        telefones: [{ numero: '981320524' }],
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione o ddd' });
  });

  it('This should return an error for not adding the phone area code', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
        nome: 'test',
        senha: '123',
        telefones: [{ ddd: '86' }],
      });

    expect(statusCode).toBe(400);

    expect(body).toEqual({ mensagem: 'Adicione o numero' });
  });
});
