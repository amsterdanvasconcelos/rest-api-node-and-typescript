import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';

const citysController = {
  ...create,
  ...getAll,
  ...getById,
};

export { citysController };
