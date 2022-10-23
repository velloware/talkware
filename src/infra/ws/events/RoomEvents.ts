import { Socket } from "socket.io";
import { Client, Message } from '../../../modules/Chat/Domain';
import { wsLogger } from '../../../shared/Utils/wsLogger';
import { RoomService } from '../../../modules/Room/Services/Room';
import { Room } from '../../../modules/Room/Domain/Room/Room';

interface IRoomEvents {
  Room: Room;
  SudoClient: Client;
}

interface TokenUser {
  token: string;
}

export class RoomEvents {

  private socket: Socket;
  private Room: Room = {} as Room;
  private GlobalRoom: Room = {} as Room;
  private client: Client = {} as Client;

  constructor(socket: Socket, tokenUserProps: any) {
    this.socket = socket;

    const tokenUser = JSON.parse(JSON.stringify(tokenUserProps));

    if (!(tokenUser?.token) || (tokenUser.token === "Anonymous")) {
      this.client = new Client({
        userId: "Anonymous",
        socketId: socket.id,
        name: `Anonymous-${new Date().getTime()}`,
      });

    } else {

      tokenUser as TokenUser;

      const findUserByTonken = {
        token: tokenUser.token,
        name: "Carlos",
        userId: "123456789",
      }

      if (!findUserByTonken) {
        console.log("USER DONT BY EXIST");
        return;
      }

      this.client = new Client({
        userId: findUserByTonken.userId,
        name: findUserByTonken.name,
        socketId: socket.id,
      });
    }


    this.socket.on("message", (data: string) => this.onMessage(data));
    this.socket.on("changeName", (name: string) => this.onChangeName(name));
    this.socket.on("changeRoom", (RoomId: string) => this.onChangeRoom(RoomId));
  }


  onJoinRoom(RoomId: string) {

    const Room = new RoomService().findRoomById(RoomId);

    if (Room.isLeft()) {
      this.socket.join(this.GlobalRoom.props.id);
      this.Room = this.GlobalRoom;
      this.Room.addUser(this.client);
      this.socket.emit("message", `Select ROOM dont find, Publics ROOMSID: [1, 2, 3]`);
      return;
    }

    this.Room = Room.value;
    this.GlobalRoom = Room.value;
    this.Room.addUser(this.client);
    this.socket.join(this.Room.props.id);
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

    this.Room.addMessage(message);
    this.socket.to(this.Room.props.id)
      .emit("message", `${this.client.props.name}: ${data}`);
  }

  onChangeRoom(RoomId: string) {
    wsLogger(this.socket, `Change Room >> ${RoomId}`);

    if (!this.Room || Object.keys(this.Room).length === 0) {
      return this.onJoinRoom(RoomId);
    }

    this.socket.leave(this.Room.props.id);
    this.Room.removeUser(this.client.props.userId);

    const findRoom = new RoomService().findRoomById(RoomId);

    if (findRoom.isLeft()) {
      this.socket.emit("message", `this Room dont exist or You dont have access to this ROOM`);
      return;
    }

    this.Room = findRoom.value;
    this.Room.addUser(this.client);
    this.socket.join(this.Room.props.id);
  }

  onChangeName(name: string) {
    wsLogger(this.socket, `Change Name to: ${name}`);
    this.client.props.name = name;
  }
}