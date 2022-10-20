import { Socket } from "socket.io";
import { Room, Client, Message } from '../../../modules/Domain';
import { wsLogger } from '../Utils/wsLogger';

export const roomGlobal = new Room({
  id: '1',
  name: 'Global Romm',
  messages: [],
  users: [],
  password: '',
  isPrivate: false,
  ownerId: '',
});

const client1 = new Client({
  id: '1',
  name: 'John Doe',
  socketId: '1234567890', D
});

const room1 = new Room({
  id: '2',
  name: 'Room 1 - John Doe',
  messages: [],
  users: [],
  password: '',
  isPrivate: false,
  ownerId: '1',
});

const room2 = new Room({
  id: '2',
  name: 'Room 2 - Glob',
  messages: [],
  users: [],
  password: '',
  isPrivate: false,
  ownerId: '1',
});

export class RoomEvents {

  private socket: Socket;
  private Room: Room = {} as Room;
  private client: Client = {} as Client;

  constructor(socket: Socket, Room: Room) {
    this.socket = socket;
    this.client = new Client({
      id: socket.id,
      name: socket.id,
      socketId: socket.id,
    });
    this.Room = Room;
    this.Room.addUser(this.client);
    this.socket.join(this.Room.props.id);

    this.socket.on("message", (data: string) => this.onMessage(data));
    this.socket.on("changeName", (name: string) => this.onChangeName(name));
    this.socket.on("changeRoom", (RoomId: string) => this.onChangeRoom(RoomId));
  }

  onMessage(data: string) {
    wsLogger(this.socket, `Message: ${data}`);
    const message = new Message({
      id: this.socket.id,
      data: data,
      roomId: this.Room.props.id,
      userId: this.client.id,
    });

    this.Room.addMessage(message);
    this.socket.to(this.Room.props.id)
      .emit("message", `${this.client.props.name}: ${data}`);
  }

  onChangeRoom(RoomId: string) {
    wsLogger(this.socket, `Change Room >> ${RoomId}`);

    this.socket.leave(this.Room.props.id);
    this.Room.removeUser(this.client);

    if (RoomId === '1') {
      this.Room = room1;
    } else if (RoomId === '2') {
      this.Room = room2;
    } else if (RoomId === '3') {
      this.Room = roomGlobal;
    }

    this.Room.addUser(this.client);
    this.socket.join(this.Room.props.id);
  }

  onChangeName(name: string) {
    wsLogger(this.socket, `Change Name to: ${name}`);
    this.client.props.name = name;
  }
}