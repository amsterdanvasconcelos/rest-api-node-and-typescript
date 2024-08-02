import { Router } from 'express';
import { citiesController, peopleController } from '../controllers';

const router = Router();

router.get('/', (_, res) => res.send('Hello, world!'));

/* CITIES */
router.get(
  '/cities',
  citiesController.getAllValidator,
  citiesController.getAll
);

router.get(
  '/cities/:id',
  citiesController.getByIdValidator,
  citiesController.getById
);

router.post(
  '/cities',
  citiesController.createValidator,
  citiesController.create
);

router.put(
  '/cities/:id',
  citiesController.updateByIdValidator,
  citiesController.updateById
);

router.delete(
  '/cities/:id',
  citiesController.deleteByIdValidator,
  citiesController.deleteById
);

/* PEOPLE */
router.get(
  '/people',
  peopleController.getAllValidator,
  peopleController.getAll
);

router.get(
  '/people/:id',
  peopleController.getByIdValidator,
  peopleController.getById
);

router.post(
  '/people',
  peopleController.createValidator,
  peopleController.create
);

router.put(
  '/people/:id',
  peopleController.updateByIdValidator,
  peopleController.updateById
);

router.delete(
  '/people/:id',
  peopleController.deleteByIdValidator,
  peopleController.deleteById
);

export { router };
