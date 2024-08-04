import 'dotenv/config';
import express from 'express';
import { cities, people, users } from './routes';

const server = express();

server.use(express.json());
server.use(cities.router);
server.use(people.router);
server.use(users.router);

export { server };
