import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Citys - UPDATE_BY_ID', () => {
  it('Atualiza registro.', async () => {
    const resCreate = await testServer
      .post('/cities')
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdateById = await testServer
      .put(`/cities/${resCreate.body}`)
      .send({ name: 'são paulo' });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta atualizar registro que não existe.', async () => {
    const response = await testServer
      .put('/cities/99999')
      .send({ name: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
