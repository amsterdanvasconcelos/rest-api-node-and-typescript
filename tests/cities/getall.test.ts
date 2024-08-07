import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('Citys - GET_ALL', () => {
  it('Busca todos os registros.', async () => {
    const resCreate = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
  it('Tenta buscar todos os registros sem enviar token de acesso.', async () => {
    const resCreate = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer.get('/cities').send();

    expect(resGetAll.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resGetAll.body).toHaveProperty('errors.default');
  });
});
