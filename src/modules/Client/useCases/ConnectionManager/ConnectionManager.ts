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
import { IRoomReturns } from 'modules/Room/interfaces/RoomReturns';

const debug = Debug('app:module:client');

export class ConnectionManager {
  private newConnection: NewConnection;
  public Client: Client = {} as Client;
  public RoomsCurrent: Room = {} as Room;
  private RoomsHasAcess: Room[] = {} as Room[];
  private RoomsCreated: IRoomReturns[] = {} as IRoomReturns[];
  private alerts: string[] = [];
  private joinRoomService: JoinRoom = {} as JoinRoom;

  constructor(createINewConnection: CreateINewConnection, joinRoom?: JoinRoom) {
    this.newConnection = new NewConnection(createINewConnection);
    this.joinRoomService = joinRoom || new JoinRoom();
  }

  public async connect() {
    const connection = await this.newConnection.execute();
    if (connection.isLeft()) {
      return false;
    }

    const client = connection.value;

    this.Client = client.client;
    this.RoomsHasAcess = client.RoomsHasAcess || [];
    this.RoomsCreated = client.RoomsCreated || [];
    this.alerts = client.alerts || [];

    // Sendo Alerts to client
    this.alerts.forEach(alert => {
      debug(alert);
    });

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
      idRoom: joinRoomProps.idRoom,
      password: joinRoomProps.password,
      RoomsHasAcess: this.RoomsHasAcess,
    });

    if (room.isLeft()) {
      debug(room.value);
      return false;
    }

    // this.RoomsCurrent remove client and add new client in new room
    this.RoomsCurrent = room.value;
    this.RoomsCurrent.addClient(this.Client);

    callback && callback(this.RoomsCurrent);

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

  public async sendVoice(voiceStream: string | Buffer) {
    debug(voiceStream);
  }

  public async changeName(name: string) {
    this.Client.name = name;
  }
}
