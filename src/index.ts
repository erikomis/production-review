import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { ErrorApp } from './ErrorApp';

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ErrorApp) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'internal  error' });
  },
);

app.listen(3333, () => {
  console.log('server start in port 3333');
});
