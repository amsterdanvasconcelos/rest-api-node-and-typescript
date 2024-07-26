import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Citys - CREATE', () => {
  it('Cria registro.', async () => {
    const response = await testServer
      .post('/cidades')
      .send({ name: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(typeof response.body).toEqual('number');
  });
  it('Não cria registro sem mandar a propriedade name.', async () => {
    const response = await testServer
      .post('/cidades')
      .send({ nam: 'fortaleza' });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
  it('Não cria registro se o name contém um número de caracteres abaixo do permitido.', async () => {
    const response = await testServer.post('/cidades').send({ name: 'ca' });

    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
});
