import { Entity } from "../../core/domain/Entity";

interface IClient {
  id?: string;
  name: string;
  socketId?: string;
}

export class Client extends Entity<IClient>{

  public socketId: string = "";

  constructor(ClientProps: IClient) {
    super(ClientProps, ClientProps.id);

    this.socketId = ClientProps.socketId || "";
  }

  get id(): string {
    return this.id;
  }

  set SocketId(socketId: string) {
    this.socketId = socketId;
    this.equals()
  }

}