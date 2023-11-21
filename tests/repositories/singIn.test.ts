/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it } from 'vitest';
import { MongoSignInRepository } from '../../src/server/repositories/SignIn/signIn';
import { User } from '../../src/models/User';

describe('signIn', () => {
  const user_for_test = {
    _id: {},
  };

  beforeEach(async () => {
    const user = await User.create({
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

    user_for_test._id = user._id;
  });

  it('should not log the user in by not adding email', async () => {
    const repository = new MongoSignInRepository();

    try {
      const user = await repository.signIn({
        senha: '1234',
      } as any);

      expect(user.token).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Não foi possivel logar o usuário');
    }
  });

  it('should not log the user in by not adding senha', async () => {
    const repository = new MongoSignInRepository();

    try {
      const user = await repository.signIn({
        email: 'test@gmail.com',
      } as any);

      expect(user.token).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Não foi possivel logar o usuário');
    }
  });

  it('should not log the user in by adding an invalid email and password', async () => {
    const repository = new MongoSignInRepository();

    try {
      const user = await repository.signIn({
        email: 'test12@gmail.com',
        senha: '1234',
      });

      expect(user.token).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Não é possivel logar o usuário');
    }
  });

  it('should logged user', async () => {
    const repository = new MongoSignInRepository();

    const user = await repository.signIn({
      email: 'test@gmail.com',
      senha: '1234',
    });

    expect(user.token).toBeTruthy();
  });
});
