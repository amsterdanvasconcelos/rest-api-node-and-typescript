import { Router } from 'express';
import { citysController } from '../controllers/controllers';

const router = Router();

router.get('/', (_, res) => res.send('Hello, world!'));

router.get('/cities', citysController.getAllValidator, citysController.getAll);

router.get(
  '/cities/:id',
  citysController.getByIdValidator,
  citysController.getById
);

router.post('/cities', citysController.createValidator, citysController.create);

router.put(
  '/cities/:id',
  citysController.updateByIdValidator,
  citysController.updateById
);

router.delete(
  '/cities/:id',
  citysController.deleteByIdValidator,
  citysController.deleteById
);

export { router };
