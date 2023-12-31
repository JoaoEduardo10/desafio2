import { beforeEach, describe, expect, it } from 'vitest';
import { serverTest } from '../setup';
import { createJwt } from '../../src/server/helpers/jsonwebtoken';

describe('get-user', () => {
  const user = {
    token: '',
  };

  beforeEach(async () => {
    user.token = createJwt({
      email: 'test@gmail.com',
      id: '1234',
      name: 'test',
    });
  });

  it('should returns an error for adding an id greater than 24', async () => {
    const { body, statusCode } = await serverTest
      .get(
        `${process.env.VERSION}/user/123232332425214365647656745324214314321156534234`,
      )
      .set('Authorization', `Bearer ${user.token}`);

    expect(statusCode).toBe(404);
    expect(body).toEqual({ mensagem: 'id invalido' });
  });

  it('should return an error for adding an ID less than 24', async () => {
    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/user/12323`)
      .set('Authorization', `Bearer ${user.token}`);

    expect(statusCode).toBe(404);
    expect(body).toEqual({ mensagem: 'id invalido' });
  });

  it('should return an error for adding an invalid ID', async () => {
    const { body, statusCode } = await serverTest
      .get(`${process.env.VERSION}/user/121212121212121212121212`)
      .set('Authorization', `Bearer ${user.token}`);

    expect(statusCode).toBe(404);
    expect(body).toEqual({ mensagem: 'id invalido' });
  });
});
