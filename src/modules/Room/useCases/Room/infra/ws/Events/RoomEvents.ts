import { Socket } from "socket.io";
import { Client } from '../../../../../../Client/Domain/Client';
import { Message } from '../../../../../../Message/Domain/Message';
import { wsLogger } from '../../../../../../../shared/Utils/wsLogger';
import { RoomRepository } from '../../../../../repositories/prisma/RoomRepository';
import { Room } from '../../../../../Domain/Room';
import { RoomManager } from '../../../Room';


export class RoomEvents {

  private socket: Socket;
  private RoomManager: RoomManager;
  private Room: Room;

  constructor(socket: Socket, tokenUserProps: any, IdRoom: string) {
    this.socket = socket;
    // Usar o RoomManager tudo que for relacionado a Room, Client, Message
    this.RoomManager = new RoomManager(new RoomRepository());

    this.socket.on("message", (data: string) => this.onMessage(data));
    this.socket.on("changeName", (name: string) => this.onChangeName(name));
    this.socket.on("changeRoom", async (RoomId: string) => this.onChangeRoom(RoomId));

    this.onJoinRoom(IdRoom)
  }

  async wealComeMessage() {

    const message = Message.create({
      id: String(new Date().getTime()),
      data: `Welcome ${this.client.name} to ${this.Room.props.name}. You are in ${this.Room.props.id}`,
      roomId: this.Room.props.id,
      userId: this.client.userId,
    })

    this.Room
      .addMessage(message);
  }

  async listParticipants() {
    const participants = this.Room.getUsers();
    this.socket.emit("participants", participants);
  }

  async listMessages() {
    const messages = this.Room.getMessages();
    for (const message of messages) {
      this.socket.to(this.client.SocketId).emit("message", `${message.data}`);
    }
  }

  async onJoinRoom(RoomId: string) {

    const Room = await new RoomRepository().findRoomById(RoomId);

    if (Room.isLeft()) {
      this.socket.emit("message", `Select ROOM dont find, Publics ROOMSID: [1, 2, 3]`);
      return;
    }

    this.Room = Room.value;
    this.Room.addUser(this.client);
    this.socket.join(this.Room.props.id);

    this.wealComeMessage();
    this.listParticipants();
    this.listMessages();
  }

  onMessage(data: string) {
    wsLogger(this.socket, `Message: ${data}`);

    if (!this.Room || Object.keys(this.Room).length === 0) {
      this.socket.emit("message", `ROOM dont SETED. Choouse One! Publics ROOMSID: [1, 2, 3]`);
      return;
    }

    const message = new Message({
      id: this.socket.id,
      data: data,
      roomId: this.Room.props.id,
      userId: this.client.userId,
    });

    this.Room
      .addMessage(message);
    this.socket
      .to(this.Room.props.id)
      .emit("message", `${this.client.props.name}: ${data}`);
  }

  async onChangeRoom(RoomId: string) {
    wsLogger(this.socket, `Change Room >> ${RoomId}`);

    if (!this.Room || Object.keys(this.Room).length === 0) {
      return this.onJoinRoom(RoomId);
    }

    this.socket.leave(this.Room.props.id);
    this.Room.removeUser(this.client.props.userId);

    const findRoom = await new RoomRepository().findRoomById(RoomId);

    if (findRoom.isLeft()) {
      this.socket
        .emit("message", `this Room dont exist or You dont have access to this ROOM`);
      return;
    }

    this.Room = findRoom.value;
    this.Room
      .addUser(this.client);

    this.socket
      .join(this.Room.props.id);

    this.Room
      .addMessage(new Message({
        id: String(new Date().getTime()),
        data: `Welcome to ${this.Room.props.name}`,
        roomId: this.Room.props.id,
        userId: this.client.userId,
      }));

  }

  onChangeName(name: string) {
    wsLogger(this.socket, `Change Name to: ${name}`);
    this.client.props.name = name;
  }
}