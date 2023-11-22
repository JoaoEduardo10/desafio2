import { beforeEach, describe, expect, it } from 'vitest';
import { serverTest } from '../setup';
import { User } from '../../src/models/User';
import { createJwt } from '../../src/server/helpers/jsonwebtoken';

describe('get-user', () => {
  const user = {
    id: '',
    token: '',
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

    user.token = createJwt({
      email: 'test@gmail.com',
      id: '1234',
      name: 'test',
    });
  });

  it('should return user', async () => {
    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/user/${user.id}`)
      .set('Authorization', `Bearer ${user.token}`);

    expect(statusCode).toBe(200);
    expect(body.id).toBeTruthy();
  });
});
