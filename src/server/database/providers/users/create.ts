import { Knex } from '../../knex';
import { User } from '../../models';
import { TableNames } from '../../TableNames';

type Create = (user: Omit<User, 'id'>) => Promise<number | Error>;

const create: Create = async (user) => {
  try {
    const [result] = await Knex(TableNames.user).insert(user).returning('id');

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    return new Error('Error ao cadastrar o registro');
  } catch (error) {
    return new Error('Error ao cadastrar o registro');
  }
};

export { create };
