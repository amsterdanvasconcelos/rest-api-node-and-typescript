import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type city = {
  name: string;
};

const bodySchema = object().shape({
  name: string().required().min(3),
});

const createValidator = validation((getSchema) => ({
  body: getSchema<city>(bodySchema),
}));

const create = async (req: Request<{}, {}, city>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};

export { create, createValidator };
