import {
  NewConnection,
  CreateINewConnection,
} from '../NewConnection/NewConnection';
import { Client } from '../../Domain/Client';
import { Room } from '../../../Room/Domain/Room';
import { JoinRoom, IJoinRoom } from '../../../Room/useCases/JoinRoom/JoinRoom';
export { IJoinRoom } from '../../../Room/useCases/JoinRoom/JoinRoom';

import Debug from 'debug';
import { Message } from '../../../Message/Domain/Message';

const debug = Debug('app:module:client');

export class ConnectionManager {
  private newConnection: NewConnection;
  public Client: Client = {} as Client;
  public RoomsCurrent: Room = {} as Room;
  private RoomsHasAcess: Room[] = {} as Room[];
  private joinRoomService: JoinRoom = {} as JoinRoom;

  constructor(createINewConnection: CreateINewConnection) {
    this.newConnection = new NewConnection(createINewConnection);
    this.joinRoomService = new JoinRoom();
  }

  public async connect() {
    const connection = await this.newConnection.execute();
    if (connection.isLeft()) {
      return false;
    }

    const client = connection.value;

    this.Client = client.client;
    this.RoomsHasAcess = client.RoomsHasAcess || [];

    return true;
  }

  public disconnect() {
    debug('Disconnected');
  }

  public async joinRoom(
    joinRoomProps: IJoinRoom,
    callback?: (room: Room) => void,
  ) {
    const room = await this.joinRoomService.join({
      idRoom: String(joinRoomProps.idRoom),
      password: joinRoomProps.password,
      RoomsHasAcess: this.RoomsHasAcess,
    });

    if (room.isLeft()) {
      debug(room.value);
      return false;
    }

    this.RoomsCurrent = room.value;
    this.RoomsCurrent.addClient(this.Client);

    if (callback) callback(this.RoomsCurrent);

    return true;
  }

  public async changeRoom(
    joinRoomProps: IJoinRoom,
    callback?: (room: Room) => void,
  ) {
    this.joinRoom(joinRoomProps, callback);
  }

  public async sendMessage(data: string, callback?: (message: string) => void) {
    const message = Message.create({
      clientId: this.Client.id,
      roomId: this.RoomsCurrent.id,
      data,
      userId: this.Client.userId,
    });

    if (message.isLeft()) {
      debug(message.value);
      return false;
    }

    this.RoomsCurrent.addMessage(message.value);

    if (callback) {
      callback(String(message.value.data));
    }
  }

  public async changeName(name: string) {
    this.Client.name = name;
  }
}
