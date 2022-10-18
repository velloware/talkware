import { Socket } from "socket.io";

const rooms = [
  {
    id: "1",
    name: "Sala 1",
  },
  {
    id: "2",
    name: "Sala 2",
  },
];

interface IRoom {
  id: string;
  name: string;
}


export class ChatEvents {

  private socket: Socket;
  private RoomId: IRoom = {} as IRoom;

  constructor(socket: Socket) {
    this.socket = socket;
    this.socket.on("ChatConnection", (data) => this.onConnection(data));
  }

  //Create room or join room
  // Esta duplicando

  public onConnection(data: string) {
    this.socket.leave(this.RoomId.id);
    this.RoomId = rooms.filter((room) => room.id === data)[0];

    if (this.RoomId.id.length > 0) {
      this.socket.join(this.RoomId.id);
      this.socket.in(this.RoomId.id).emit("ChatMessage", `User ${this.socket.id} joined the room ${this.RoomId.name}`);
    }

    this.socket.on('ChatMessage', (data) => {
      console.log('SATA 1')
      this.socket.in(this.RoomId.id).emit("ChatMessage", `${this.socket.id}: ${data}`);
    });
  }

  ChangeRoom() {

  }

  onMessage(data: string) {
    console.log("Message Chat", data);
  }
}