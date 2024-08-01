import { Knex } from './server/database/knex';
import { server } from './server/server';

const port = process.env.PORT || 3333;

const startServer = () => {
  server.listen(port, () => console.log(`App rodando na porta ${port}`));
};

const init = async () => {
  if (process.env.IS_LOCALHOST === 'true') {
    return startServer();
  }

  try {
    await Knex.migrate.latest();
    await Knex.seed.run();
    startServer();
  } catch (error) {
    console.log(error);
  }
};

init();
