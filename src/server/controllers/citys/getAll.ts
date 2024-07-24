import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type queyProps = {
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
  query: getSchema<queyProps>(querySchema),
}));

const getAll = async (req: Request<{}, {}, {}, queyProps>, res: Response) => {
  console.log(req.query);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};

export { getAll, getAllValidator };
