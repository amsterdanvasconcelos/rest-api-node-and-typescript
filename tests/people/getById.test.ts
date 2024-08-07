import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('People - GET_BY_ID', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCreateCity = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'Belo Horizonte' });

    expect(resCreateCity.statusCode).toEqual(StatusCodes.CREATED);

    cityId = resCreateCity.body;
  });

  it('Busca registro por id.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessica@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);

    const resGetById = await testServer
      .get(`/people/${resCreatePerson.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.OK);
    expect(resGetById.body).toHaveProperty('id');
    expect(resGetById.body).toHaveProperty('fullName');
    expect(resGetById.body).toHaveProperty('email');
    expect(resGetById.body).toHaveProperty('cityId');
  });
  it('Tenta buscar registro que não existe', async () => {
    const response = await testServer
      .get('/people/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
  it('Tenta buscar registro que não existe', async () => {
    const response = await testServer.get('/people/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});
