import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, mundo!');
});

router.post('/', (req, res) => {
  return res.status(StatusCodes.OK).json(req.body);
});

export { router };
