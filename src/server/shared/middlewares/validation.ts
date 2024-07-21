import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';

type property = 'body' | 'query' | 'header' | 'params';

type allSchemas = Record<property, Schema>;

type tValidation = (schemas: Partial<allSchemas>) => RequestHandler;

const validation: tValidation = (schemas) => async (req, res, next) => {
  let errosResult: Record<string, Record<string, string>> = {};
  const hasErros = () => Object.entries(errosResult).length !== 0;

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as property], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });

      errosResult[key] = errors;
    }
  });

  if (!hasErros()) return next();

  return res.status(StatusCodes.BAD_REQUEST).json({ errors: errosResult });
};

export { validation };
