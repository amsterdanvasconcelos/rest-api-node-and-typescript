import * as signIn from './signIn';
import * as signUp from './signUp';

const usersController = {
  ...signIn,
  ...signUp,
};

export { usersController };
