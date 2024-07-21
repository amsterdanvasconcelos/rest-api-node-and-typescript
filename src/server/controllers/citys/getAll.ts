import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

const createValidator = validation({
  body: object().shape({
    name: string().required().min(3),
  }),
});

const create = async (req: Request, res: Response) => {
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};

export { create, createValidator };
