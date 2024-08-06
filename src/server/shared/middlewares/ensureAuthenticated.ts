import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getJsonError } from '../../controllers/getJsonError';
import { jwtService } from '../services';

const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Não autenticado!'));
  }

  const [type, token] = authorization.split(' ');

  const isValideType = type === 'Bearer';
  if (!isValideType) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Não autenticado!'));
  }

  const jwtData = jwtService.verify(token);

  if (jwtData === 'JWT_SECRET_NOT_FOUND') {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(getJsonError('Erro ao verificar o token!'));
  }

  if (jwtData === 'INVALID_TOKEN') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(getJsonError('Não autenticado!'));
  }

  req.headers.uid = jwtData.uid.toString();

  return next();
};

export { ensureAuthenticated };
