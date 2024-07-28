import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type QueryProps = {
  page?: number;
  limit?: number;
  filter?: string;
};

const querySchema = object().shape({
  page: number().optional().moreThan(0),
  limit: number().optional().moreThan(0),
  filter: string().optional(),
});

const getAllValidator = validation((getSchema) => ({
  query: getSchema<QueryProps>(querySchema),
}));

const getAll = async (req: Request<{}, {}, {}, QueryProps>, res: Response) => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([{ id: 1, name: 'são paulo' }]);
};

export { getAll, getAllValidator };
