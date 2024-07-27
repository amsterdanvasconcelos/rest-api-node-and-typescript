import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Citys - DELETE_BY_ID', () => {
  it('Apaga registro', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/cidades/${resCreate.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta apagar registro que não existe', async () => {
    const response = await testServer.delete('/cidades/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
