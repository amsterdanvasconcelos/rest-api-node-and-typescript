import { Knex } from '../../knex';
import { City } from '../../models';
import { TableNames } from '../../TableNames';

const create = async (city: Omit<City, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(TableNames.city).insert(city).returning('id');
    console.log('result create:', result);

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    throw new Error('Error ao cadastrar cidade.');
  } catch (error) {
    throw new Error('Error ao cadastrar cidade.');
  }
};

export { create };
