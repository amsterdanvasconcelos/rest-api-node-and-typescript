import { Router } from 'express';
import { citysController } from '../controllers/controllers';

const router = Router();

router.get('/', (_, res) => res.send('Olá, mundo!'));

router.get('/cidades', citysController.getAllValidator, citysController.getAll);

router.get(
  '/cidades/:id',
  citysController.getByIdValidator,
  citysController.getById
);

router.post(
  '/cidades',
  citysController.createValidator,
  citysController.create
);

router.put(
  '/cidades/:id',
  citysController.updateByIdValidator,
  citysController.updateById
);

router.delete(
  '/cidades/:id',
  citysController.deleteByIdValidator,
  citysController.deleteById
);

export { router };
