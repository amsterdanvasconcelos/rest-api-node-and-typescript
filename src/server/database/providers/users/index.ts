import * as create from './create';
import * as getByEmail from './getByEmail';

const usersProvider = {
  ...create,
  ...getByEmail,
};

export { usersProvider };
