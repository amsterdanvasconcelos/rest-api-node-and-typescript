import { Router } from 'express';
import { citysController } from '../controllers/controllers';

const router = Router();

router.get(
  '/cidades/:id',
  citysController.getByIdValidator,
  citysController.getById
);

router.get('/cidades', citysController.getAllValidator, citysController.getAll);

router.post(
  '/cidades',
  citysController.createValidator,
  citysController.create
);

router.get('/', (_, res) => {
  return res.send('Olá, mundo!');
});

export { router };
