export interface IMessage {
  id: string;
  data: string | Buffer; //Message data
  roomId: string; //Room id
  userId?: string; //User id
  clientId: string; //Client id
}

export interface MessageClass {
  get id(): string;
  get data(): string | Buffer;
  get roomId(): string | Buffer;
  get userId(): string | Buffer;
}
