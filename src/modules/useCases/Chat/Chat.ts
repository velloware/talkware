import { Client, Room } from '../../Domain';

export class Chat {

  private roomGlobal: Room = {} as Room;
  private ClientSudo: Client = {} as Client;

  constructor() {
    this.ClientSudo = new Client({
      id: '1',
      name: 'Sudo',
      socketId: '',
    });

    this.roomGlobal = new Room({
      id: '1',
      name: 'Global Room',
      messages: [],
      users: [],
      isPrivate: false,
      password: '',
      ownerId: this.ClientSudo.id,
    });
  }

  public getRoomGlobal(): Room {
    return this.roomGlobal;
  }

  public getClientSudo(): Client {
    return this.ClientSudo;
  }

}