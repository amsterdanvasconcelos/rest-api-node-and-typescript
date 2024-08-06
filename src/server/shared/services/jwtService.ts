import * as jwt from 'jsonwebtoken';

type JwtData = { uid: number };

type Sign = (data: JwtData) => string | 'JWT_SECRET_NOT_FOUND';

type Verify = (
  token: string
) => JwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN';

const sign: Sign = (data) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify: Verify = (token) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string') return 'INVALID_TOKEN';

    return decoded as JwtData;
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

const jwtService = {
  sign,
  verify,
};

export { jwtService };
