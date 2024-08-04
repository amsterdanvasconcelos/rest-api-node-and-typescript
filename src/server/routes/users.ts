import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

router.get('/', (_, res) => res.send('Hello, world!'));

router.post('/login', usersController.signInValidator, usersController.signIn);

router.post(
  '/register',
  usersController.signUpValidator,
  usersController.signUp
);

export { router };
