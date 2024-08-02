import { Knex } from 'knex';
import { TableNames } from '../TableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(TableNames.person, (table) => {
      table.bigIncrements('id').primary().index();
      table
        .string('fullName', 200)
        .checkLength('<=', 200)
        .index()
        .notNullable();
      table.string('email', 200).checkLength('<=', 200).unique().notNullable();
      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(TableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Tabela usada para armazenar pessoas.');
    })
    .then(() => console.log(`# Created table ${TableNames.person}`));
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable(TableNames.person)
    .then(() => console.log(`# Dropped table ${TableNames.person}`));
}
