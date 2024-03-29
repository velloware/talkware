import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cluster from 'cluster';
import * as http from 'http';
import Debug from 'debug';
import routes from './routes/index';
import ProcessController from '../process/Controller';
import { AppError } from '../../shared/Error/AppError';

class ServerHttp {
  private multiProcess: boolean;
  private debug: Debug.IDebugger;
  private app: express.Application;
  private server: http.Server;
  private port: number | string;

  constructor(port: number | string, multiProcess: boolean) {
    this.debug = Debug('app:server');
    this.multiProcess = multiProcess;
    this.app = express();
    this.server = http.createServer(this.app);
    this.port = port;
  }

  init() {
    if (cluster.isPrimary && this.multiProcess) {
      ProcessController.PrimaryProcess();
    } else {
      ProcessController.SetNameWorker();
      this.middlerwares();
      this.routes();
      this.middlewareHandlerErrors();
      this.server.listen(this.port, () => {
        this.debug(`Server started on port ${this.port}`);
      });
    }
  }

  routes() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
  }

  middlerwares() {
    this.app.use(
      (request: Request, response: Response, _next: NextFunction) => {
        request.debug = this.debug;
        request.debug(`> ${request.path} -> Acess`);
        _next();
      },
    );
  }

  middlewareHandlerErrors() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        _next: NextFunction,
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }
        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }

  close(callback: () => void) {
    this.server.close(callback);
  }

  getServer() {
    return this.server;
  }
}

export default ServerHttp;
