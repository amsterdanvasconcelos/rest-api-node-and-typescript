import { Knex } from './server/database/knex';
import { server } from './server/server';

const port = process.env.PORT || 3333;

const startServer = () => {
  server.listen(port, () => console.log(`App rodando na porta ${port}`));
};

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest().then(startServer).catch(console.log);
} else {
  startServer();
}
