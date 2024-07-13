import { Router } from 'express';
import { citysController } from '../controllers/controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá, mundo!');
});

router.post('/cidades', citysController.create);

export { router };
