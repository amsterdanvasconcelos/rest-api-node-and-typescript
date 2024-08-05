import { TableNames } from '../../TableNames';
import { Knex } from '../../knex';

type Count = (filter: string) => Promise<number | Error>;

const count: Count = async (filter = '') => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where('name', 'like', `%${filter}%`)
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error('Erro ao consultar a quantidade total de registros.');
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Erro ao consultar a quantidade total de registros.');
  }
};

export { count };
