import { Knex } from '../../knex';
import { Person } from '../../models';
import { TableNames } from '../../TableNames';

type UpdateById = (
  id: number,
  person: Omit<Person, 'id'>
) => Promise<void | Error>;

const updateById: UpdateById = async (id, person) => {
  try {
    const [{ count }] = await Knex(TableNames.city)
      .where('id', '=', person.cityId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada.');
    }

    const result = await Knex(TableNames.person)
      .update(person)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro.');
  } catch (error) {
    console.log('Provider - error:', error);
    return new Error('Erro ao atualizar o registro.');
  }
};

export { updateById };
