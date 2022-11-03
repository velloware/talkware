export interface IClient {
  userId: string;
  name: string;
  socketId?: string;
}

export interface ClientClass {
  get userId(): string;
  get name(): string;
  set name(name: string);
  set SocketId(socketId: string);
}