import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { City } from '../../database/models';
import { citiesProviders } from '../../database/providers';
import { validation } from '../../shared/middlewares/middlewares';
import { getJsonError } from '../getJsonError';

type BodyProps = Omit<City, 'id'>;

type Create = (req: Request<{}, {}, BodyProps>, res: Response) => void;

const bodySchema = object().shape({
  name: string().required().min(3).max(50),
});

const createValidator = validation((getSchema) => ({
  body: getSchema<BodyProps>(bodySchema),
}));

const create: Create = async (req, res) => {
  const result = await citiesProviders.create(req.body);
  console.log('oi:', result);

  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.CREATED).json(result);
};

export { create, createValidator };
