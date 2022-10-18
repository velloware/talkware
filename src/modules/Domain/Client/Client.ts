import { Entity } from "../../../core/domain/Entity";
import { ClientClass, IClient } from "./IClient";

export class Client extends Entity<IClient> implements ClientClass {

  public socketId: string = "";

  constructor(ClientProps: IClient) {
    super(ClientProps, ClientProps.id);

    this.socketId = ClientProps.socketId || "";
  }

  get id(): string {
    return this.props.id || '';
  }

  get name(): string {
    return this.props.name;
  }

  set SocketId(socketId: string) {
    this.socketId = socketId;
  }

  set name(name: string) {
    this.props.name = name;
  }

}