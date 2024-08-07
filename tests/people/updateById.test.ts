import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('People - UPDATE_BY_ID', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCreateCity = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'Belo Horizonte' });

    expect(resCreateCity.statusCode).toEqual(StatusCodes.CREATED);

    cityId = resCreateCity.body;
  });

  it('Atualiza registro.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessica@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdateById = await testServer
      .put(`/people/${resCreatePerson.body}`)
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Amsterdan',
        email: 'amsterdan@email.com',
        cityId,
      });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Tenta atualizar registro que não existe.', async () => {
    const resUpdateById = await testServer
      .put('/people/99999')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Amsterdan',
        email: 'amsterdan@email.com',
        cityId,
      });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resUpdateById.body).toHaveProperty('errors.default');
  });
  it('Tenta atualizar registro sem enviar token de acesso.', async () => {
    const resUpdateById = await testServer.put('/people/99999').send({
      fullName: 'Amsterdan',
      email: 'amsterdan@email.com',
      cityId,
    });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(resUpdateById.body).toHaveProperty('errors.default');
  });
});
