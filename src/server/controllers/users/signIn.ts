import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { usersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares/validation';
import { User } from '../../database/models';
import { getJsonError } from '../getJsonError';
import { passwordCrypto } from '../../shared/services/passwordCrypto';

type BodyProps = Omit<User, 'id' | 'name'>;

type SignIn = (req: Request<{}, {}, BodyProps>, res: Response) => void;

const bodySchema = object().shape({
  email: string().email().min(5).max(50).required(),
  password: string().min(6).max(50).required(),
});

const signInValidator = validation((getSchema) => ({
  body: getSchema<BodyProps>(bodySchema),
}));

const signIn: SignIn = async (req, res) => {
  const { email, password } = req.body;

  const result = await usersProvider.getByEmail(email);

  if (result instanceof Error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Email ou senha inválido.'));
  }

  const passwordMatched: boolean = await passwordCrypto.verifyPassword(
    password,
    result.password
  );

  if (passwordMatched !== true) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Email ou senha inválido.'));
  }

  return res.status(StatusCodes.OK).json({ accessToken: 'test.test.test' });
};

export { signInValidator, signIn };
