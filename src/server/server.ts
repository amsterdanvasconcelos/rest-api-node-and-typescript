import 'dotenv/config';
import express from 'express';
import { cities, people } from './routes';

const server = express();

server.use(express.json());
server.use(cities.router);
server.use(people.router);

export { server };
