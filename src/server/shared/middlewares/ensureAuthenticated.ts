import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getJsonError } from '../../controllers/getJsonError';

const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Não autenticado!'));
  }

  const [type, token] = authorization.split(' ');
  const isValideType = type === 'Bearer';
  const isValideToken = token === 'test.test.test';

  if (!isValideType || !isValideToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Não autenticado!'));
  }

  return next();
};

export { ensureAuthenticated };
