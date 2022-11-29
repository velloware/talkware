export interface IClient {
  id: string;
  name: string;
  userId?: string;
}

export interface ClientClass {
  get id(): string;
  get userId(): string;
  get name(): string;
  set name(name: string);
}
