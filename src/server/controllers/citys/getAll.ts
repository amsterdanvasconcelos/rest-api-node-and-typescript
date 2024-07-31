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
  const result = await citiesProviders.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || '',
    Number(req.query.id)
  );
  const count = await citiesProviders.count(req.query.filter || '');

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
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json(result);
};

export { getAll, getAllValidator };
