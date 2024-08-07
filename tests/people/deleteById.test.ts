import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('People - DELETE_BY_ID', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCreateCity = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'Belo Horizonte' });

    expect(resCreateCity.statusCode).toEqual(StatusCodes.CREATED);

    cityId = resCreateCity.body;
  });

  it('Apaga registro', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessica@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/people/${resCreatePerson.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta apagar registro que não existe', async () => {
    const response = await testServer
      .delete('/people/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
  it('Tenta apagar registro sem enviar token de acesso', async () => {
    const response = await testServer.delete('/people/99999').send();

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});
