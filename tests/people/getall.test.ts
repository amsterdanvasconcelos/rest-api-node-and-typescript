import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('People - GET_ALL', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCreateCity = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'Belo Horizonte' });

    expect(resCreateCity.statusCode).toEqual(StatusCodes.CREATED);

    cityId = resCreateCity.body;
  });

  it('Busca todos os registros.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessica@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
  it('Tenta buscar todos os registros sem enviar o token de acesso.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessicaaa@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer.get('/people').send();

    expect(resGetAll.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
  });
});
