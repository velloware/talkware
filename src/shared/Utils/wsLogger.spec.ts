import { wsLogger } from './wsLogger';
import { Socket } from "socket.io";

describe('Test wsLogger', () => {
  it('Should be a create wsLogger', () => {
    const socket = {
      id: 'id',

    } as Socket;

    const text = 'text';
    const action = 'action';

    console.log = jest.fn();

    const logger = wsLogger(socket, text, action);

    expect(logger).toBeUndefined();
  });
});