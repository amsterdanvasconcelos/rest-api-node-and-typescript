import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';
import { peopleProvider } from '../../database/providers';
import { getJsonError } from '../getJsonError';

type ParamsProps = {
  id?: number;
};

type DeleteById = (req: Request<ParamsProps>, res: Response) => void;

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const deleteByIdValidator = validation((getSchema) => ({
  params: getSchema<ParamsProps>(paramsSchema),
}));

const deleteById: DeleteById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(getJsonError('O parâmetro "id" precisa ser informado!'));
  }

  const result = await peopleProvider.deleteById(Number(id));
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

export { deleteById, deleteByIdValidator };
