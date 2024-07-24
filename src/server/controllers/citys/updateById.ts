import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';
import { validation } from '../../shared/middlewares/middlewares';

type paramsProps = {
  id?: number;
};

type bodyProps = {
  name: string;
};

const paramsSchema = object().shape({
  id: number().integer().required().moreThan(0),
});

const bodySchema = object().shape({
  name: string().required().min(3),
});

const updateByIdValidator = validation((getSchema) => ({
  params: getSchema<paramsProps>(paramsSchema),
  body: getSchema<bodyProps>(bodySchema),
}));

const updateById = async (
  req: Request<paramsProps, {}, bodyProps>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};

export { updateById, updateByIdValidator };
