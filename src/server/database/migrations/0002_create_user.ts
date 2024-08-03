import { Knex } from 'knex';
import { TableNames } from '../TableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.user, (table) => {
      table.bigIncrements('id').primary().index();
      table
        .string('name', 50)
        .checkLength('<=', 50)
        .checkLength('>=', 3)
        .notNullable();
      table
        .string('email', 70)
        .checkLength('<=', 70)
        .unique()
        .index()
        .notNullable();
      table
        .string('password', 50)
        .checkLength('<=', 50)
        .checkLength('>=', 6)
        .notNullable();

      table.comment('Tabela usada para armazenar usuários.');
    })
    .then(() => console.log(`# Created table ${TableNames.user}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(TableNames.user)
    .then(() => console.log(`# Dropped table ${TableNames.user}`));
}
