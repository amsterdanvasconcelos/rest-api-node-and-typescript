import { City } from '../../models';

declare module 'knex/types/tables' {
  type Tables = {
    city: City;
    // person: Person;
    // user: User;
  };
}
