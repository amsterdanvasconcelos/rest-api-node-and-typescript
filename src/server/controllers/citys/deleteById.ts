import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';
import { citiesProviders } from '../../database/providers';
import { getJsonError } from '../getJsonError';

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
  if (!req.params.id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(getJsonError('O parâmetro "id" precisa ser informado!'));
  }

  console.log(
    'É numero?',
    typeof req.params.id,
    typeof req.params.id === 'number'
  );

  const result = await citiesProviders.deleteById(req.params.id);
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

export { deleteById, deleteByIdValidator };
