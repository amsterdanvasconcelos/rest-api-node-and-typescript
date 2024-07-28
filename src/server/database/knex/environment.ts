import { Knex } from 'knex';
import path from 'path';

const developement: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'database.sqlite'
    ),
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    },
  },
};

const test: Knex.Config = {
  ...developement,
  connection: ':memory:',
};

const production: Knex.Config = {
  ...developement,
};

export { developement, production, test };
