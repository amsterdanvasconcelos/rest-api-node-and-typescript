import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { Person } from '../../database/models';
import { validation } from '../../shared/middlewares/middlewares';
import { getJsonError } from '../getJsonError';
import { peopleProvider } from '../../database/providers';

type ParamsProps = {
  id?: number;
};

type BodyProps = Omit<Person, 'id'>;

type UpdateById = (
  req: Request<ParamsProps, {}, BodyProps>,
  res: Response
) => void;

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const bodySchema = object().shape({
  fullName: string().required().min(3).max(200),
  email: string().required().email(),
  cityId: number().integer().required().moreThan(0),
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

  const result = await peopleProvider.updateById(Number(id), req.body);
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};

export { updateById, updateByIdValidator };
