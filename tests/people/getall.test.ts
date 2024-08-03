import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('People - GET_ALL', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCreateCity = await testServer
      .post('/cities')
      .send({ name: 'Belo Horizonte' });

    expect(resCreateCity.statusCode).toEqual(StatusCodes.CREATED);

    cityId = resCreateCity.body;
  });

  it('Busca todos os registros.', async () => {
    const resCreatePerson = await testServer.post('/people').send({
      fullName: 'Jéssica',
      email: 'jessica@email.com',
      cityId,
    });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer.get('/people').send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
