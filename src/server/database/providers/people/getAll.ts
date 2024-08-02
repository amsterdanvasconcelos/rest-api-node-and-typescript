import { TableNames } from '../../TableNames';
import { Person } from '../../models';
import { Knex } from '../../knex';

type GetAll = (
  page: number,
  limit: number,
  filter: string
) => Promise<Person[] | Error>;

const getAll: GetAll = async (page, limit, filter) => {
  try {
    const result = await Knex(TableNames.person)
      .select('*')
      .where('fullName', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Erro ao consultar os registros.');
  }
};

export { getAll };
