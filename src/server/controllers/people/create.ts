import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { Person } from '../../database/models';
import { peopleProvider } from '../../database/providers';
import { validation } from '../../shared/middlewares/middlewares';
import { getJsonError } from '../getJsonError';

type BodyProps = Omit<Person, 'id'>;

type Create = (req: Request<{}, {}, BodyProps>, res: Response) => void;

const bodySchema = object().shape({
  fullName: string().required().min(3).max(200),
  email: string().required().email(),
  cityId: number().integer().required().moreThan(0),
});

const createValidator = validation((getSchema) => ({
  body: getSchema<BodyProps>(bodySchema),
}));

const create: Create = async (req, res) => {
  const result = await peopleProvider.create(req.body);

  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.CREATED).json(result);
};

export { create, createValidator };
