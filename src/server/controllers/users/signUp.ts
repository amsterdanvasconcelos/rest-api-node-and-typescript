import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { User } from '../../database/models';
import { usersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares/validation';
import { getJsonError } from '../getJsonError';

type BodyProps = Omit<User, 'id'>;

type SignUp = (req: Request<{}, {}, BodyProps>, res: Response) => void;

const bodySchema = object().shape({
  name: string().min(3).max(50).required(),
  email: string().email().min(5).max(50).required(),
  password: string().min(6).max(50).required(),
});

const signUpValidator = validation((getSchema) => ({
  body: getSchema<BodyProps>(bodySchema),
}));

const signUp: SignUp = async (req, res) => {
  const result = await usersProvider.create(req.body);

  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.CREATED).json(result);
};

export { signUpValidator, signUp };
