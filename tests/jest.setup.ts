import supertest from 'supertest';
import { Knex } from '../src/server/database/knex';
import { server } from '../src/server/server';
import { StatusCodes } from 'http-status-codes';

let accessToken = '';

const generateToken = async () => {
  const resRegister = await testServer.post('/register').send({
    name: 'Amsterdan',
    email: 'super-unico-email@email.com',
    password: '123456',
  });

  expect(resRegister.statusCode).toEqual(StatusCodes.CREATED);
  expect(typeof resRegister.body).toEqual('number');

  const resLogin = await testServer.post('/login').send({
    email: 'super-unico-email@email.com',
    password: '123456',
  });

  expect(resLogin.statusCode).toEqual(StatusCodes.OK);
  expect(resLogin.body).toHaveProperty('accessToken');

  accessToken = resLogin.body.accessToken;
};

beforeAll(async () => {
  await Knex.migrate.latest();
  await generateToken();
});

afterAll(async () => await Knex.destroy());

const testServer = supertest(server);

export { testServer, accessToken };
