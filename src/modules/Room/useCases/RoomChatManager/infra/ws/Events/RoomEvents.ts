import { Client } from '../../../../../../Client/Domain/Client';
import { Socket } from 'socket.io';
import { wsLogger } from '../../../../../../../shared/Utils/wsLogger';
import { RoomManager, clientConnectRoomProps } from '../../../Room';
import { SocketDataClient } from 'modules/Client/useCases/NewConnection/NewConnection';
export { clientConnectRoomProps } from '../../../Room';

export class RoomEvents {
  private socket: Socket;
  private roomManager: RoomManager = {} as RoomManager;
  public joinedRoom: boolean;

  constructor(socket: Socket) {
    this.socket = socket;
    this.joinedRoom = false;
  }
}
