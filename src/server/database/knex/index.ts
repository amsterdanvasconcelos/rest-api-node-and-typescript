import { knex } from 'knex';
import { developement, production, test } from './environment';

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production;
    case 'test':
      return test;
    default:
      return developement;
  }
};

const Knex = knex(getEnvironment());

export { Knex };
