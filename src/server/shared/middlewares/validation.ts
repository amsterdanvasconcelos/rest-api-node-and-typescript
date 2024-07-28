import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';

type Property = 'body' | 'query' | 'header' | 'params';

type GetSchema = <T>(schema: Schema<T>) => Schema<T>;

type AllSchemas = Record<Property, Schema<unknown>>;

type GetAllSchemas = (getSchema: GetSchema) => Partial<AllSchemas>;

type Validation = (getAllSchemas: GetAllSchemas) => RequestHandler;

const validation: Validation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas((schema) => schema);
  let errosResult: Record<string, Record<string, string>> = {};
  const hasErros = () => Object.entries(errosResult).length !== 0;

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as Property], { abortEarly: false });
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
