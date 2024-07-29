import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { City } from '../../database/models';
import { validation } from '../../shared/middlewares/middlewares';

type ParamsProps = {
  id?: number;
};

type BodyProps = Omit<City, 'id'>;

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const bodySchema = object().shape({
  name: string().required().min(3).max(50),
});

const updateByIdValidator = validation((getSchema) => ({
  params: getSchema<ParamsProps>(paramsSchema),
  body: getSchema<BodyProps>(bodySchema),
}));

const updateById = async (
  req: Request<ParamsProps, {}, BodyProps>,
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
