import { ConnectionManager } from 'modules/Client/useCases/ConnectionManager/ConnectionManager';
import { IJoinRoom } from 'modules/Room/useCases/JoinRoom/JoinRoom';
import { Socket } from 'socket.io';

export class Handler {
  private socket: Socket;
  public connectionManager: ConnectionManager;

  constructor(socket: Socket, connectionManager: ConnectionManager) {
    this.socket = socket;
    this.connectionManager = connectionManager;

    this.socket.on('joinRoom', async (joinRoomProps: IJoinRoom) => {
      await this.onJoinRoom(joinRoomProps);
    });

    this.socket.on('message', async (data: string) => this.onMessage(data));
    this.socket.on('message', async (data: string) => this.onMessage(data));
    this.socket.on('leaveRoom', () => this.onLeaveRoom());
  }

  private async onMessage(data: string) {
    await this.connectionManager.sendMessage(data, (message: string) => {
      this.socket
        .to(this.connectionManager.RoomsCurrent.id)
        .emit('message', `${this.connectionManager.Client.name}: ${message}`);
    });
  }

  public async onJoinRoom(joinRoomProps: IJoinRoom) {
    if (this.connectionManager.RoomsCurrent) {
      this.socket.leave(this.connectionManager.RoomsCurrent.id);

      await this.connectionManager.changeRoom(joinRoomProps, room => {
        this.socket.join(room.id);
        this.socket.emit('log', `Joined room: ${room.id}`);
        this.newConnectionInRoom();
      });
    } else {
      await this.connectionManager.joinRoom(joinRoomProps, room => {
        this.socket.join(room.id);
        this.socket.emit('log', `Joined room: ${room.id}`);
        this.newConnectionInRoom();
      });
    }
  }

  public async onLeaveRoom() {
    this.socket.leave(this.connectionManager.RoomsCurrent.id);
  }

  private async newConnectionInRoom() {
    this.onMessage(`*Join in '${this.connectionManager.RoomsCurrent.name}'*`);
    this.socket.emit(
      'message',
      `*Welcome ${this.connectionManager.Client.name} To '${this.connectionManager.RoomsCurrent.name}'*`,
    );
  }
}
