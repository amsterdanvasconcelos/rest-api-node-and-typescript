import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type ParamsProps = {
  id?: number;
};

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const deleteByIdValidator = validation((getSchema) => ({
  params: getSchema<ParamsProps>(paramsSchema),
}));

const deleteById = async (req: Request<ParamsProps>, res: Response) => {
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado!',
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

export { deleteById, deleteByIdValidator };
