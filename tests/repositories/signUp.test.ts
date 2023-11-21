/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';
import { MongoSignUpRepository } from '../../src/server/repositories/signUp/signUp';
import { ISignUpParams } from '../../src/server/repositories/signUp/protocols';
import { User } from '../../src/models/User';

describe('signUp', () => {
  it('should create a user', async () => {
    const user: ISignUpParams = {
      email: 'test@gmail.com',
      nome: 'test',
      senha: '1234',
      telefones: [
        {
          ddd: '86',
          numero: '123456789',
        },
      ],
    };

    const repository = new MongoSignUpRepository();

    const isUser = await User.findOne({ email: user.email });

    expect(isUser).not.toBeTruthy();

    const user_created = await repository.signUp(user);

    expect(user_created.id).toBeTruthy();

    const existesUser = await User.findOne({ email: user.email });

    expect(existesUser).toBeTruthy();
  });

  it('should throw an error for not adding any parameters', async () => {
    const user = {
      email: 'test@gmail.com',
      senha: '1234',
      telefones: [
        {
          ddd: '86',
          numero: '123456789',
        },
      ],
    } as ISignUpParams;

    const repository = new MongoSignUpRepository();

    try {
      const user_created = await repository.signUp(user);

      expect(user_created.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Não é possivel criar o usuário');
    }
  });

  it('should throw an error because it does not create the user in the execution time', async () => {
    vi.spyOn(User, 'create').mockReturnValue(null as any);

    const user = {
      email: 'test@gmail.com',
      senha: '1234',
      nome: 'test',
      telefones: [
        {
          ddd: '86',
          numero: '123456789',
        },
      ],
    } as ISignUpParams;

    const repository = new MongoSignUpRepository();

    try {
      const user_created = await repository.signUp(user);

      expect(user_created.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Não é possivel criar o usuário');
    }
  });
});
