import jwt from 'jsonwebtoken';

export interface Ijwt {
  id: string;
  email: string;
  name: string;
}

export interface IjwtComplete {
  iat: number;
  exp: number;
}

export const createJwt = (data: Ijwt) => {
  const jwtHash = process.env.HASH_JWT as string;

  return jwt.sign(data, jwtHash, { expiresIn: '3m' });
};

export const compareJwt = (
  token: string,
): (Ijwt & IjwtComplete) | undefined => {
  const jwtHash = process.env.HASH_JWT as string;

  try {
    const varifyToken = jwt.verify(token, jwtHash);

    if (typeof varifyToken === 'string') {
      throw new Error('não autorizado');
    }

    return varifyToken as Ijwt & IjwtComplete;
  } catch (error) {
    if (error) return undefined;
  }
};
