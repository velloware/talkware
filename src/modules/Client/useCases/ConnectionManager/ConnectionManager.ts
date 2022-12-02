import {
  NewConnection,
  CreateINewConnection,
} from '../NewConnection/NewConnection';
import { Client } from '../../Domain/Client';
import { Room } from '../../../Room/Domain/Room';
import { JoinRoom, IJoinRoom } from '../../../Room/useCases/JoinRoom/JoinRoom';
export { IJoinRoom } from '../../../Room/useCases/JoinRoom/JoinRoom';

import Debug from 'debug';

const debug = Debug('app:module:client');

export class ConnectionManager {
  private newConnection: NewConnection;
  private Client: Client = {} as Client;
  private RoomsCurrent: Room = {} as Room;
  private RoomsHasAcess: Room[] = {} as Room[];
  private RoomsCreated: Room[] = {} as Room[];
  private alerts: string[] = [];

  constructor(createINewConnection: CreateINewConnection) {
    this.newConnection = new NewConnection(createINewConnection);
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

    return true;
  }

  public disconnect() {
    debug('Disconnected');
  }

  public async joinRoom(joinRoomProps: IJoinRoom) {
    const joinRoom = new JoinRoom();

    const room = await joinRoom.join({
      idRoom: joinRoomProps.idRoom,
      password: joinRoomProps.password,
      RoomsHasAcess: this.RoomsHasAcess,
    });

    if (room.isLeft()) {
      debug(room.value);
      return false;
    }

    this.RoomsCurrent = room.value;
    this.RoomsCurrent.addClient(this.Client);
    debug(this.RoomsCurrent);
    debug(this.RoomsCurrent.getClients()[0]);

    return true;
  }
}
