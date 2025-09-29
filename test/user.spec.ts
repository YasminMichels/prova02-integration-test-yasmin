import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { StatusCodes } from 'http-status-codes';

describe('req/res software testing', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://reqres.in/api';

  p.request.setDefaultTimeout(60000);
  p.request.setBaseUrl(baseUrl);
  p.request.setDefaultHeaders({
    'x-api-key': 'reqres-free-v1'
  });

  beforeAll(async () => {
    p.reporter.add(rep);
  });

  //Busca uma lista de usuários
  it('should get a list of users', async () => {
    await p
      .spec()
      .get('/users')
      .expectStatus(StatusCodes.OK);
  });

  //Atualiza as infos de um usuário
  it('should update a user', async () => {
    await p
      .spec()
      .put('/users/2')
      .withJson({
        first_name : 'Yasmi',
        last_name : 'Michels'
      })
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        first_name : 'Yasmi',
        last_name : 'Michels' 
      })
  });

  //Atualiza as infos de um usuário
  it('should update first name user', async () => {
    await p
      .spec()
      .patch('/users/1')
      .withBody({
        first_name: 'Ya'
      })
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        first_name: 'Ya'
      });
  });

  //Deleta um usuário
  it('should delete a user', async () => {
    await p
      .spec()
      .delete('/users/1')
      .expectStatus(StatusCodes.NO_CONTENT)
  });

  //Busca um usuário específico
  it('should get one users', async () => {
    await p
      .spec()
      .get('/users/2')
      .expectStatus(StatusCodes.OK);
  });
});
