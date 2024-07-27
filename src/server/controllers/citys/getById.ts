import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type paramsProps = {
  id?: number;
};

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const getByIdValidator = validation((getSchema) => ({
  params: getSchema<paramsProps>(paramsSchema),
}));

const getById = async (req: Request<paramsProps>, res: Response) => {
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado!',
      },
    });
  }

  return res
    .status(StatusCodes.OK)
    .json({ id: req.params.id, name: 'fortaleza' });
};

export { getById, getByIdValidator };
