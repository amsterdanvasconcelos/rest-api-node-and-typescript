import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Citys - GET_ALL', () => {
  it('Busca todos os registros.', async () => {
    const resCreate = await testServer
      .post('/cidades')
      .send({ name: 'fortaleza' });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer.get('/cidades').send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
