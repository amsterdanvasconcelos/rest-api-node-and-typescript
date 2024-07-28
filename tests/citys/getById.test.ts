import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Citys - GET_BY_ID', () => {
  it('Busca registro por id.', async () => {
    const resCreate = await testServer
      .post('/cities')
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetById = await testServer.get(`/cities/${resCreate.body}`).send();

    expect(resGetById.statusCode).toEqual(StatusCodes.OK);
    expect(resGetById.body).toHaveProperty('name');
    expect(resGetById.body).toHaveProperty('id');
  });
  it('Tenta buscar registro que não existe', async () => {
    const response = await testServer.get('/cities/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
