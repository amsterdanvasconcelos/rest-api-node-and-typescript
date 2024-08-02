import { City, Person } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    city: City;
    person: Person;
    // user: User;
  }
}
