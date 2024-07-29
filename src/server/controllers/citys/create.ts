import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { City } from '../../database/models';
import { citiesProviders } from '../../database/providers';
import { validation } from '../../shared/middlewares/middlewares';

type BodyProps = Omit<City, 'id'>;

const bodySchema = object().shape({
  name: string().required().min(3).max(50),
});

const createValidator = validation((getSchema) => ({
  body: getSchema<BodyProps>(bodySchema),
}));

const create = async (req: Request<{}, {}, BodyProps>, res: Response) => {
  const result = await citiesProviders.create(req.body);
  console.log('oi:', result);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};

export { create, createValidator };
