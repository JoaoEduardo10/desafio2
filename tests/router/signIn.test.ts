import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../src/models/User';
import { serverTest } from '../setup';

describe('signIn', () => {
  beforeEach(async () => {
    await User.create({
      email: 'test12@gmail.com',
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

  it('should logged a user', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/login`)
      .send({
        email: 'test12@gmail.com',
        senha: '1234',
      });

    expect(statusCode).toBe(200);

    expect(body.token).toBeTruthy();
  });
});
