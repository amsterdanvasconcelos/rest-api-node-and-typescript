import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';
import { getJsonError } from '../getJsonError';
import { citiesProvider } from '../../database/providers';

type ParamsProps = {
  id?: number;
};

type GetById = (req: Request<ParamsProps>, res: Response) => void;

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const getByIdValidator = validation((getSchema) => ({
  params: getSchema<ParamsProps>(paramsSchema),
}));

const getById: GetById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(getJsonError('O parâmetro "id" precisa ser informado!'));
  }

  const result = await citiesProvider.getById(Number(id));
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.OK).json(result);
};

export { getById, getByIdValidator };
