import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

const app: Express = express();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default app;