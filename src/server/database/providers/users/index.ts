import * as create from './create';
import * as getByEmail from './getByEmail';

const userProvider = {
  ...create,
  ...getByEmail,
};

export { userProvider };
