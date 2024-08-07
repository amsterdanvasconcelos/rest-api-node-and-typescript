import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('Citys - UPDATE_BY_ID', () => {
  it('Atualiza registro.', async () => {
    const resCreate = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdateById = await testServer
      .put(`/cities/${resCreate.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'são paulo' });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta atualizar registro que não existe.', async () => {
    const response = await testServer
      .put('/cities/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
  it('Tenta atualizar registro sem enviar token de acesso.', async () => {
    const response = await testServer
      .put('/cities/99999')
      .send({ name: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});
