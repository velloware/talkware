import { Socket } from "socket.io";
import { Room, Client, Message } from '../../../modules/Domain';
import { wsLogger } from '../Utils/wsLogger';
import { RoomService } from '../../../modules/useCases/Room/Services/Room';

interface IRoomEvents {
  Room: Room;
  SudoClient: Client;
}

export class RoomEvents {

  private socket: Socket;
  private Room: Room = {} as Room;
  private GlobalRoom: Room = {} as Room;
  private client: Client = {} as Client;

  constructor(socket: Socket, { Room, SudoClient }: IRoomEvents) {
    this.socket = socket;
    this.client = new Client({
      id: socket.id,
      name: socket.id,
      socketId: socket.id,
    });
    this.Room = Room;
    this.GlobalRoom = Room;
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

    const findRoom = new RoomService().findRoomById(RoomId);

    if (!findRoom) {
      this.socket.join(this.GlobalRoom.props.id);
      this.Room = this.GlobalRoom;
      this.Room.addUser(this.client);
      this.socket.emit("message", `Select ROOM dont find, REDIRED to Global Room`);
      return;
    }

    this.Room = findRoom;
    this.Room.addUser(this.client);
    this.socket.join(this.Room.props.id);
  }

  onChangeName(name: string) {
    wsLogger(this.socket, `Change Name to: ${name}`);
    this.client.props.name = name;
  }
}