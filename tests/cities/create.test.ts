import { StatusCodes } from 'http-status-codes';
import { testServer, accessToken } from '../jest.setup';

describe('Citys - CREATE', () => {
  it('Cria registro.', async () => {
    const response = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });
  it('Não cria registro sem mandar a propriedade name.', async () => {
    const response = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ nam: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
  it('Não cria registro se o name contém um número de caracteres abaixo do permitido.', async () => {
    const response = await testServer
      .post('/cities')
      .set({ authorization: `Bearer ${accessToken}` })
      .send({ name: 'ca' });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
  it('Tenta criar um registro sem token de acesso.', async () => {
    const response = await testServer.post('/cities').send({ name: 'carmem' });

    expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default');
  });
});
