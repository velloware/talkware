import { Socket } from "socket.io";
import { Message } from '../../../../../../Message/Domain/Message';
import { wsLogger } from '../../../../../../../shared/Utils/wsLogger';
import { RoomManager, typeClientToken } from '../../../Room';

export interface joinChat {
  idRoom: string;
  tokenUser: typeClientToken;
}

export class RoomEvents {

  private socket: Socket;
  private roomManager: RoomManager = {} as RoomManager;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  async onJoinChat(joinChatProps: joinChat) {
    const roomManager = await RoomManager.createRoomManager(
      joinChatProps.idRoom,
      this.socket.id,
      {
        token: joinChatProps.tokenUser.token,
      }
    );

    if (roomManager.isLeft()) {
      throw new Error("Error on create room manager");
    }

    this.roomManager = roomManager.value;

    this.socket.join(joinChatProps.idRoom);
  }

  async wealComeMessage() { }

  async listParticipants() { }

  async listMessages() { }

  onMessage(data: string) { }

  async onChangeRoom(RoomId: string) {
    this.socket.leave(this.roomManager.RoomId);
    this.socket.join(RoomId);
  }

  onChangeName(name: string) { }
}