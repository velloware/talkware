export interface IClient {
  id?: string;
  name: string;
  socketId?: string;
}

export interface ClientClass {
  get id(): string;
  get name(): string;
  set name(name: string);
  set SocketId(socketId: string);
}