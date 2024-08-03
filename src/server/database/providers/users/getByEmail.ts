import { Knex } from '../../knex';
import { TableNames } from '../../TableNames';
import { User } from '../../models';

type GetByEmail = (email: string) => Promise<User | Error>;

const getByEmail: GetByEmail = async (email) => {
  try {
    const result = await Knex(TableNames.user)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado.');
  } catch (error) {
    return new Error('Error ao consultar o registro.');
  }
};

export { getByEmail };
