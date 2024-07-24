import * as create from './create';
import * as getAll from './getAll';

const citysController = {
  ...create,
  ...getAll,
};

export { citysController };
