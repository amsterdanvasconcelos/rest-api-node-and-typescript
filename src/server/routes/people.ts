import { Router } from 'express';
import { peopleController } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (_, res) => res.send('Hello, world!'));

router.get(
  '/people',
  ensureAuthenticated,
  peopleController.getAllValidator,
  peopleController.getAll
);

router.get(
  '/people/:id',
  ensureAuthenticated,
  peopleController.getByIdValidator,
  peopleController.getById
);

router.post(
  '/people',
  ensureAuthenticated,
  peopleController.createValidator,
  peopleController.create
);

router.put(
  '/people/:id',
  ensureAuthenticated,
  peopleController.updateByIdValidator,
  peopleController.updateById
);

router.delete(
  '/people/:id',
  ensureAuthenticated,
  peopleController.deleteByIdValidator,
  peopleController.deleteById
);

export { router };
