import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { City } from '../../database/models';
import { validation } from '../../shared/middlewares/middlewares';

type BodyProps = Omit<City, 'id'>;

const bodySchema = object().shape({
  name: string().required().min(3),
});

const createValidator = validation((getSchema) => ({
  body: getSchema<BodyProps>(bodySchema),
}));

const create = async (req: Request<{}, {}, BodyProps>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};

export { create, createValidator };
