import * as create from './create';
import * as deleteById from './deleteById';
import * as getAll from './getAll';
import * as getById from './getById';
import * as updateById from './updateById';

const citiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
};

export { citiesController };
