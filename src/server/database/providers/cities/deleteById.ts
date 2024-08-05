import { Knex } from '../../knex';
import { TableNames } from '../../TableNames';

type DeleteById = (id: number) => Promise<void | Error>;

const deleteById: DeleteById = async (id) => {
  try {
    const result = await Knex(TableNames.city).where('id', '=', id).del();

    if (result > 0) return;

    return new Error('Error ao apagar o registro.');
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Error ao apagar o registro.');
  }
};

export { deleteById };
