import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';
import * as updateById from './updateById';

const citysController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
};

export { citysController };
