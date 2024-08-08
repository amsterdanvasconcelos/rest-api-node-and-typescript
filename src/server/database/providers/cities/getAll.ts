import { TableNames } from '../../TableNames';
import { City } from '../../models';
import { Knex } from '../../knex';

type GetAll = (
  page: number,
  limit: number,
  filter: string,
  id: number
) => Promise<City[] | Error>;

const getAll: GetAll = async (page, limit, filter, id) => {
  try {
    const result = await Knex(TableNames.city)
      .select('*')
      .where('id', '=', id)
      .orWhere('name', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(TableNames.city)
        .select('*')
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Erro ao consultar os registros.');
  }
};

export { getAll };
