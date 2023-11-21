/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MongoGetUserRepository } from '../../src/server/repositories/get-user/get-user';
import { User } from '../../src/models/User';

describe('get-user', () => {
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

  it('should get user with id', async () => {
    const repository = new MongoGetUserRepository();

    const get_user = await repository.get({
      id: user.id,
    });

    expect(get_user.id).toBeTruthy();
  });

  it('should return an error for not adding an ID', async () => {
    const repository = new MongoGetUserRepository();

    try {
      const get_user = await repository.get({
        id: '',
      });

      expect(get_user.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel buscar o usuário',
      );
    }
  });

  it('should returns an error when fetching the user', async () => {
    const repository = new MongoGetUserRepository();

    vi.spyOn(User, 'findById').mockReturnValue(null as any);

    try {
      const get_user = await repository.get({
        id: '1234',
      });

      expect(get_user.id).not.toBeTruthy();
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe(
        'Não foi possivel buscar o usuário',
      );
    }
  });
});
