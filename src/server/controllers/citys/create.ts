import { Request, Response } from 'express';

type city = {
  name: string;
};

const create = (req: Request<{}, {}, city>, res: Response) => {
  return res.json(`Criada a cidade de ${req.body.name}`);
};

export { create };
