import { genSalt, hash, compare } from 'bcryptjs';

type HashPassword = (password: string, salt?: number) => Promise<string>;

type VerifyPassword = (
  password: string,
  hashedPassword: string
) => Promise<boolean>;

const hashPassword: HashPassword = async (password, salt = 8) => {
  const saltGenerated = await genSalt(salt);
  const hashPassword = await hash(password, saltGenerated);
  return hashPassword;
};

const verifyPassword: VerifyPassword = async (password, hashedPassword) => {
  const passwordMatched = await compare(password, hashedPassword);
  return passwordMatched;
};

const passwordCrypto = {
  hashPassword,
  verifyPassword,
};

export { passwordCrypto };
