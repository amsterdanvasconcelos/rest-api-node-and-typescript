import { Knex } from '../../knex';
import { TableNames } from '../../TableNames';

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(TableNames.city).where('id', '=', id).del();

    if (result > 0) return;

    return new Error('Error ao apagar o registro da cidade.');
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Error ao apagar o registro da cidade.');
  }
};

export { deleteById };
