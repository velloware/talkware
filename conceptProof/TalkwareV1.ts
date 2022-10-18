import { Client, Message, Room } from '../src/modules/Domain';

const client = new Client({
  id: '1',
  name: 'John Doe',
  socketId: '1234567890',
});

const client2 = new Client({
  id: '2',
  name: 'Doe Carlos',
  socketId: 'asdasdas1123',
});

const room = new Room({
  id: '1',
  name: 'Room 1',
  messages: [],
  users: [],
  password: '',
  isPrivate: false,
  ownerId: client.id,
});

room.addUser(client);
room.addUser(client2);

console.log(room.getUsers());

const message = new Message({
  id: '1',
  data: 'Hello World',
  roomId: room.props.id,
  userId: client.id,
});


room.addMessage(message);

console.log(room.getMessages());
console.log(room.getOwnerId());

room.removeMessage('1');
console.log(room.getMessages());


