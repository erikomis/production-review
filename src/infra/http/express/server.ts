import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import 'reflect-metadata';
import { AddressInfo } from 'net';
import 'express-async-errors';
import cors from 'cors';
import { ErrorApp } from './ErrorApp';
import { routerIndex } from './routes';
import '~/shared/container';

export class ExpressServer {
  app: express.Application;
  server: http.Server;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(routerIndex);
    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        _next: NextFunction,
      ) => {
        if (error instanceof ErrorApp) {
          return response.status(error.statusCode).json({
            message: error.message,
          });
        }
        console.log(error);
        return response
          .status(500)
          .json({ status: 'error', message: 'internal error' });
      },
    );
  }

  async listen() {
    this.server = this.app.listen(3333, () => {
      const addressInfo = this.server.address() as AddressInfo;
      console.log(`server started at  http://localhost:${addressInfo.port}`);
    });
  }

  async close() {
    this.server?.close();
  }
}
