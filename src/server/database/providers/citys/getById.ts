import { Knex } from '../../knex';
import { City } from '../../models';
import { TableNames } from '../../TableNames';

type GetById = (id: number) => Promise<City | Error>;

const getById: GetById = async (id) => {
  try {
    const result = await Knex(TableNames.city)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado.');
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Erro ao consultar o registro.');
  }
};

export { getById };
