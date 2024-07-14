import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

type city = {
  name: string;
  state: string;
};

const cityValidation: yup.Schema<city> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

const create = async (req: Request<{}, {}, city>, res: Response) => {
  let validatedData: city | undefined = undefined;

  try {
    validatedData = await cityValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  return res.json(validatedData);
};

export { create };
