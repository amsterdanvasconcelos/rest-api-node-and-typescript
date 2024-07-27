import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type paramsProps = {
  id?: number;
};

type bodyProps = {
  name: string;
};

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const bodySchema = object().shape({
  name: string().required().min(3),
});

const updateByIdValidator = validation((getSchema) => ({
  params: getSchema<paramsProps>(paramsSchema),
  body: getSchema<bodyProps>(bodySchema),
}));

const updateById = async (
  req: Request<paramsProps, {}, bodyProps>,
  res: Response
) => {
  if (Number(req.params.id) === 99999) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Registro não encontrado!',
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

export { updateById, updateByIdValidator };
