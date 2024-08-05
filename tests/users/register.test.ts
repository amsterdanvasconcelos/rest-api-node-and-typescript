import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Users - REGISTER', () => {
  it('Criar registro.', async () => {
    const response = await testServer.post('/register').send({
      name: 'Amsterdan',
      email: 'amsterdan@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });
  it('Criar registro duas vezes.', async () => {
    const resFirst = await testServer.post('/register').send({
      name: 'Amsterdan',
      email: 'amsterdan2@email.com',
      password: '123456',
    });

    expect(resFirst.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resFirst.body).toEqual('number');

    const resSecond = await testServer.post('/register').send({
      name: 'Jessica',
      email: 'jessica@email.com',
      password: '123456',
    });

    expect(resSecond.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resSecond.body).toEqual('number');
  });
  it('Tenta criar usuário com email dublicado.', async () => {
    const resFirst = await testServer.post('/register').send({
      name: 'Amsterdan',
      email: 'amsterdan3@email.com',
      password: '123456',
    });

    expect(resFirst.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resFirst.body).toEqual('number');

    const resSecond = await testServer.post('/register').send({
      name: 'Jessica',
      email: 'amsterdan3@email.com',
      password: '654321',
    });

    expect(resSecond.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resSecond.body).toHaveProperty('errors.default');
  });
  it('Tenta criar registro sem mandar a propriedade name.', async () => {
    const response = await testServer.post('/register').send({
      email: 'amsterdan@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
  it('Tenta criar registro sem mandar a propriedade email.', async () => {
    const response = await testServer.post('/register').send({
      name: 'amsterdan',
      password: '123456',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
  });
  it('Tenta criar registro sem mandar a propriedade password.', async () => {
    const response = await testServer.post('/register').send({
      name: 'amsterdan',
      email: 'amsterdan@email.com',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
  });
  it('Tenta criar registro passando um name com menos de 3 caracteres.', async () => {
    const response = await testServer.post('/register').send({
      name: 'am',
      email: 'amsterdan@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
  it('Tenta criar registro passando um password com menos de 6 caracteres.', async () => {
    const response = await testServer.post('/register').send({
      name: 'amsterdan',
      email: 'asterdan@email.com',
      password: '12345',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
  });
  it('Tenta criar registro passando um email com sintaxe inválida.', async () => {
    const response = await testServer.post('/register').send({
      name: 'amsterdan',
      email: 'amsterdanemail.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
  });
});
