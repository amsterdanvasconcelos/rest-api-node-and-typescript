import { Knex } from '../../knex';
import { City } from '../../models';
import { TableNames } from '../../TableNames';

type Create = (city: Omit<City, 'id'>) => Promise<number | Error>;

const create: Create = async (city) => {
  try {
    const [result] = await Knex(TableNames.city).insert(city).returning('id');

    if (typeof result === 'object') return result.id;

    return result;
  } catch (error) {
    return new Error('Error ao cadastrar cidade.');
  }
};

export { create };
