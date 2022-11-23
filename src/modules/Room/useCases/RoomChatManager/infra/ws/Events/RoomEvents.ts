import { Socket } from "socket.io";
import { wsLogger } from '../../../../../../../shared/Utils/wsLogger';
import { RoomManager, clientConnectProps } from '../../../Room';
export { clientConnectProps } from '../../../Room';

export class RoomEvents {

  private socket: Socket;
  private roomManager: RoomManager = {} as RoomManager;
  public joinedRoom: string;

  constructor(socket: Socket) {
    this.socket = socket;
    this.joinedRoom = '';
  }

  async joinRoom(clientConnectProps: clientConnectProps) {

    if (!clientConnectProps) {
      this.socket.emit("error", "Invalid data");
      return;
    }

    if (clientConnectProps.idRoom === this.roomManager.RoomId) {
      this.socket.emit("log", "You are already in this room");
      return true;
    }

    if (this.joinedRoom) {
      wsLogger(this.socket, "Already joined", "Join");
      await this.onChangeRoom(clientConnectProps.idRoom);
      return true;
    }

    wsLogger(this.socket, "Joining room new Client", "JoinNewClient");

    await this.onJoinChat(clientConnectProps);

    this.wealComeMessage();

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
    this.socket.on("voice", (voiceStream: string | Buffer) => this.onVoice(voiceStream));
    this.socket.on("changeName", (name: string) => this.onChangeName(name));
    this.socket.on("disconnect", () => this.onDisconnect());

    this.joinedRoom = this.roomManager.RoomId;

    return this.roomManager.RoomId;
  }

  async wealComeMessage() {
    this.socket.to(this.roomManager.RoomId).emit("log", `Log: Join Client => ${this.roomManager.Client.name}`);
    this.socket.emit("message", `*Welcome ${this.roomManager.Client.name} To '${this.roomManager.RoomId}'*`);
  }

  roomInfo() {
    const roomInfos = {
      clients: this.roomManager.Room.props.clients,
      isPrivate: this.roomManager.Room.props.isPrivate,
      messages: this.roomManager.Room.props.messages,
      name: this.roomManager.Room.props.name,
      roomId: this.roomManager.Room.props.id,
      ownerId: this.roomManager.Room.props.ownerId
    }
  }

  listParticipants() {
    const participants = this.roomManager.Room.getClients();
    this.socket.emit("listParticipants", participants);
  }

  listMessages() {
    const messages = this.roomManager.Room.props.messages;
    this.socket.emit("listMessages", messages);
  }

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

  async onVoice(voiceStream: string | Buffer) {
    wsLogger(this.socket, `Voice ${this.roomManager.Client.name}`, "Voice");
    this.socket.to(this.roomManager.RoomId).emit("voice", voiceStream);
  }

  async onDisconnect() {
    wsLogger(this.socket, `Disconnect ${this.roomManager.Client.name}`, "Disconnect");
  }

  async onChangeRoom(RoomId: string) {
    this.socket.leave(this.roomManager.RoomId);

    const tryRoom = await this.roomManager.changeRoom(RoomId);

    if (!tryRoom) {
      return;
    }

    wsLogger(this.socket, `Change chat and Join chat ${this.roomManager.Client.name}`, "Join");

    this.wealComeMessage();

    this.socket.join(tryRoom);
  }

  onChangeName(name: string) {
    let swap = this.roomManager.Client.name;
    if (name === 'Log' || name === 'System' || name === 'log') {
      this.socket.emit("message", `Log: Your name can't be '${name}'`);
      this.socket.emit("error", "Invalid name");
      return;
    }

    this.roomManager.Client.name = `${name}`;
    wsLogger(this.socket, `Change name ${this.roomManager.Client.name}`, "ChangeName");
    this.socket.to(this.roomManager.RoomId).emit("log", `Log: Client change name => ${swap} to ${this.roomManager.Client.name}`);

  }
}
