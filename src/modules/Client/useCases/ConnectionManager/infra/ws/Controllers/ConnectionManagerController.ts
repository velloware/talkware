import { Socket } from 'socket.io';
import { ConnectionManager, IJoinRoom } from '../../../ConnectionManager';

export class ConnectionManagerController {
  private socket: Socket;
  public connectionManager: ConnectionManager;

  constructor(socket: Socket, connectionManager: ConnectionManager) {
    this.socket = socket;
    this.connectionManager = connectionManager;

    this.socket.on('joinRoom', async (joinRoomProps: IJoinRoom) => {
      await this.onJoinRoom(joinRoomProps);
    });
    this.socket.on('message', async (data: string) => this.onMessage(data));
    this.socket.on('voice', (voiceStream: string | Buffer) =>
      this.onVoice(voiceStream),
    );
    this.socket.on('changeName', (name: string) => this.onChangeName(name));
  }

  private async onMessage(data: string) {
    await this.connectionManager.sendMessage(data, (message: string) => {
      this.socket
        .to(this.connectionManager.RoomsCurrent.id)
        .emit('message', `${this.connectionManager.Client.name}: ${message}`);
    });
  }

  private async onVoice(voiceStream: string | Buffer) {
    await this.connectionManager.sendVoice(voiceStream);
  }

  private async onChangeName(name: string) {
    await this.connectionManager.changeName(name);
  }

  public async onJoinRoom(joinRoomProps: IJoinRoom) {
    if (this.connectionManager.RoomsCurrent) {
      this.socket.leave(this.connectionManager.RoomsCurrent.id);
      await this.connectionManager.changeRoom(joinRoomProps, room => {
        this.socket.join(room.id);
        this.socket.emit('log', `Joined room: ${room.id}`);
        this.socket.emit(
          'message',
          `*Welcome ${this.connectionManager.Client.name} To '${this.connectionManager.RoomsCurrent.name}'*`,
        );
      });

      return;
    }

    await this.connectionManager.joinRoom(joinRoomProps, room => {
      this.socket.join(room.id);
      this.socket.emit('log', `Joined room: ${room.id}`);
      this.socket.emit(
        'message',
        `*Welcome ${this.connectionManager.Client.name} To '${this.connectionManager.RoomsCurrent.name}'*`,
      );
    });
  }
}
