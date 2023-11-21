import { describe, expect, it } from 'vitest';
import { serverTest } from '../setup';

describe('signUp', () => {
  it('should create a user', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/user`)
      .send({
        email: 'test2@email.com',
        nome: 'test',
        senha: '123',
        telefones: [{ ddd: '86', numero: '981320524' }],
      });

    expect(statusCode).toBe(201);
    expect(body.id).toBeTruthy();
  });
});
