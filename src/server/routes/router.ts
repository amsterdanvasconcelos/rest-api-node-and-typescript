import { Router } from 'express';
import { citysController } from '../controllers/controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, mundo!');
});

router.get('/cidades', citysController.getAllValidator, citysController.getAll);

router.post(
  '/cidades',
  citysController.createValidator,
  citysController.create
);

export { router };
