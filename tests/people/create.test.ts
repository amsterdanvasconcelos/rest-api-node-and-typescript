import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('People - CREATE', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCreateCity = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'Belo Horizonte' });

    expect(resCreateCity.statusCode).toEqual(StatusCodes.CREATED);

    cityId = resCreateCity.body;
  });

  it('Cria registro.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessica@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreatePerson.body).toEqual('number');
  });
  it('Não cria registro sem mandar a propriedade fullName.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullNa: 'Jéssica',
        email: 'jessica@email.com',
        cityId,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatePerson.body).toHaveProperty('errors.body.fullName');
  });
  it('Não cria registro se o fullName contém um número de caracteres abaixo do permitido.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jé',
        email: 'jessica@email.com',
        cityId: 1,
      });

    expect(resCreatePerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resCreatePerson.body).toHaveProperty('errors.body.fullName');
  });
  it('Não criar registro se o cityId não existe no banco de cidades.', async () => {
    const resCreatePerson = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Jéssica',
        email: 'jessica@email.com',
        cityId: 9999,
      });

    expect(resCreatePerson.statusCode).toEqual(
      StatusCodes.INTERNAL_SERVER_ERROR
    );
    expect(resCreatePerson.body).toHaveProperty('errors.default');
  });
  it('Tenta criar registro com email duplicado.', async () => {
    const resCreate1 = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Amsterdan',
        email: 'amsterdan@email.com',
        cityId,
      });

    expect(resCreate1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resCreate1.body).toEqual('number');

    const resCreate2 = await testServer
      .post('/people')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({
        fullName: 'Mateus',
        email: 'amsterdan@email.com',
        cityId,
      });

    expect(resCreate2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resCreate2.body).toHaveProperty('errors.default');
  });
  it('Tenta criar registro sem enviar o token de acesso.', async () => {
    const response = await testServer.post('/people').send({
      fullName: 'Mateus',
      email: 'amsterdan@email.com',
      cityId,
    });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});
