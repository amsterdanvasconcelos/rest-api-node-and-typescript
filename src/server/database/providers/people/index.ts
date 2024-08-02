import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';
import * as updateById from './updateById';
import * as deleteById from './deleteById';
import * as count from './count';

const peopleProviders = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
  ...count,
};

export { peopleProviders };
