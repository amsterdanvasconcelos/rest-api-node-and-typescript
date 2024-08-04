import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { City } from '../../database/models';
import { validation } from '../../shared/middlewares/middlewares';
import { getJsonError } from '../getJsonError';
import { citiesProviders } from '../../database/providers';

type ParamsProps = {
  id?: number;
};

type BodyProps = Omit<City, 'id'>;

type UpdateById = (
  req: Request<ParamsProps, {}, BodyProps>,
  res: Response
) => void;

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

const updateById: UpdateById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(getJsonError('O parâmetro "id" precisa ser informado!'));
  }

  const result = await citiesProviders.updateById(Number(id), req.body);
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

export { updateById, updateByIdValidator };
