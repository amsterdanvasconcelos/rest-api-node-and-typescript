import { Knex } from 'knex';
import { TableNames } from '../TableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.city, (table) => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();

      table.comment('Tabela usada para armazenar cidades.');
    })
    .then(() => console.log(`# Created table ${TableNames.city}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(TableNames.city)
    .then(() => console.log(`# Dropped table ${TableNames.city}`));
}
