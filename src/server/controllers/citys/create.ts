import { Request, Response } from 'express';
import * as yup from 'yup';

type city = {
  name: string;
};

const cityValidation: yup.Schema<city> = yup.object().shape({
  name: yup.string().required().min(3),
});

const create = async (req: Request<{}, {}, city>, res: Response) => {
  let validatedData: city | undefined = undefined;

  try {
    validatedData = await cityValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      },
    });
  }

  return res.json(validatedData);
};

export { create };
