import os from 'os';
import cluster from 'cluster';
import Debug from 'debug';

const debug = Debug('app:infra:process');

class ProcessController {
  static PrimaryProcess() {
    if (cluster.isPrimary) {
      process.title = 'Talkware - server primary';
      debug('> Primary process started');
      const processesCount = os.cpus().length;
      debug(`> Server Primary running in process - ${process.pid}`);
      debug(
        `> Server Forking process, creating a Worker process - ${processesCount}\n`,
      );

      for (let index = 0; index < processesCount; index++) {
        cluster.fork();
      }

      cluster.on('exit', async (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
          debug(
            `> Server Worker [PID = ${worker.process.pid}] ending/died, Forking another Worker process!`,
          );
          cluster.fork();
        }
      });

      return true;
    }

    process.title = 'Talkware - server worker';

    return false;
  }

  static InstFork(Cluster = 1) {
    for (let index = 0; index < Cluster; index++) {
      cluster.fork();
    }
  }

  static SetNameWorker() {
    process.title = 'Talkware - server worker';
  }
}

export default ProcessController;
