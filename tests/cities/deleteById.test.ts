import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Citys - DELETE_BY_ID', () => {
  it('Apaga registro', async () => {
    const resCreate = await testServer
      .post('/cities')
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/cities/${resCreate.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta apagar registro que não existe', async () => {
    const response = await testServer.delete('/cities/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
