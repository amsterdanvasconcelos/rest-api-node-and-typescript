import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { citiesProviders } from '../../database/providers';
import { getJsonError } from '../getJsonError';
import { validation } from '../../shared/middlewares/middlewares';

type QueryProps = {
  page?: number;
  limit?: number;
  filter?: string;
  id?: number;
};

type GetAll = (req: Request<{}, {}, {}, QueryProps>, res: Response) => void;

const querySchema = object().shape({
  page: number().optional().moreThan(0),
  limit: number().optional().moreThan(0),
  filter: string().optional(),
  id: number().integer().optional().default(0),
});

const getAllValidator = validation((getSchema) => ({
  query: getSchema<QueryProps>(querySchema),
}));

const getAll: GetAll = async (req, res) => {
  const { page = 1, limit = 10, filter = '', id } = req.query;

  const result = await citiesProviders.getAll(
    Number(page),
    Number(limit),
    filter,
    Number(id)
  );
  const count = await citiesProviders.count(filter);

  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(result.message));
  }
  if (count instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError(count.message));
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};

export { getAll, getAllValidator };
