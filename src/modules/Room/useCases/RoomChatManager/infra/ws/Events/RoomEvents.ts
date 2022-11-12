import { Socket } from "socket.io";
import { wsLogger } from '../../../../../../../shared/Utils/wsLogger';
import { RoomManager, clientConnectProps } from '../../../Room';

export class RoomEvents {

  private socket: Socket;
  private roomManager: RoomManager = {} as RoomManager;
  public joinedRoom: string;

  constructor(socket: Socket) {
    this.socket = socket;
    this.joinedRoom = '';
  }

  async joinRoom(clientConnectProps: clientConnectProps | any) {
    if (this.joinedRoom) {
      wsLogger(this.socket, "Already joined", "Join");
      await this.onChangeRoom(clientConnectProps.idRoom);
      return true;
    }

    wsLogger(this.socket, "Joining room new Client", "JoinNewClient");

    await this.onJoinChat(clientConnectProps);

    return true;
  }

  async onJoinChat(clientConnectProps: clientConnectProps | any): Promise<string> {
    if (clientConnectProps || !clientConnectProps.idRoom || !clientConnectProps.token) {
      this.socket.emit("error", "Invalid data");
    } else {
      clientConnectProps as clientConnectProps;
    }

    const roomManager = await RoomManager.createRoomManager(
      this.socket.id,
      {
        idRoom: clientConnectProps.idRoom,
        token: clientConnectProps.token,
      }
    );

    if (roomManager.isLeft()) {
      throw new Error("Error on create room manager");
    }

    this.roomManager = roomManager.value;

    this.socket.join(clientConnectProps.idRoom);

    wsLogger(this.socket, `Join chat ${this.roomManager.Client.name}`, "Join");

    this.socket.on("message", async (data: string) => this.onMessage(data));
    this.socket.on("changeName", (name: string) => this.onChangeName(name));

    this.joinedRoom = this.roomManager.RoomId;

    return this.roomManager.RoomId;
  }

  async wealComeMessage() { }

  async listParticipants() { }

  async listMessages() { }

  async onMessage(data: string) {
    wsLogger(this.socket, `Message >> ${data}`, "Message");

    const message = await this.roomManager.createMessage({
      clientId: this.roomManager.Client.id,
      data: data,
      roomId: this.roomManager.RoomId
    });

    if (!message) {
      this.socket.emit("error", "Error in Create Message");
      return;
    }

    this.socket.to(this.roomManager.RoomId).emit("message", `${this.roomManager.Client.name}: ${message.data}`);

  }

  async onChangeRoom(RoomId: string) {
    this.socket.leave(this.roomManager.RoomId);

    const tryRoom = await this.roomManager.changeRoom(RoomId);

    if (!tryRoom) {
      return;
    }

    wsLogger(this.socket, `Change chat and Join chat ${this.roomManager.Client.name}`, "Join");

    this.socket.join(tryRoom);
  }

  onChangeName(name: string) {
    this.roomManager.Client.name = `${name}`;
    wsLogger(this.socket, `Change name ${this.roomManager.Client.name}`, "ChangeName");
  }
}