import { Knex } from '../../knex';
import { Person } from '../../models';
import { TableNames } from '../../TableNames';

type Create = (person: Omit<Person, 'id'>) => Promise<number | Error>;

const create: Create = async (person) => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where('id', '=', person.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada.');
    }

    const [result] = await Knex(TableNames.person)
      .insert(person)
      .returning('id');

    if (typeof result === 'object') return result.id;
    if (typeof result === 'number') return result;

    return new Error('Error ao cadastrar o registro.');
  } catch (error) {
    return new Error('Error ao cadastrar o registro.');
  }
};

export { create };
