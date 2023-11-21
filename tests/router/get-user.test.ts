import { beforeEach, describe, expect, it } from 'vitest';
import { serverTest } from '../setup';
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

  it('should return user', async () => {
    const { body, statusCode } = await serverTest.get(
      `${process.env.VERSION}/user/${user.id}`,
    );

    expect(statusCode).toBe(200);
    expect(body.id).toBeTruthy();
  });
});
