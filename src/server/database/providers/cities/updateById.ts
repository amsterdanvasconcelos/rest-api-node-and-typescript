import { Knex } from '../../knex';
import { City } from '../../models';
import { TableNames } from '../../TableNames';

type UpdateById = (id: number, city: Omit<City, 'id'>) => Promise<void | Error>;

const updateById: UpdateById = async (id, city) => {
  try {
    const result = await Knex(TableNames.city)
      .update(city)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro.');
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Erro ao atualizar o registro.');
  }
};

export { updateById };
