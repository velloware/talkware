import { JWT } from '../../../modules/User/Domain/jwt';
import { ExtendedError } from 'socket.io/dist/namespace';
import { Socket } from 'socket.io';

export default function ensureAuthenticated(
  socket: Socket,
  next: (err?: ExtendedError) => void,
): void {
  const { token } = socket.handshake.query;

  try {
    if (!token) {
      throw new Error('JWT token is missing');
    }

    if (typeof token !== 'string') {
      throw new Error('JWT token must be a string');
    }

    const VerifyAndToken = JWT.verifyAndDecodeToken(token);

    if (VerifyAndToken.isLeft()) {
      if (token === 'Anonymous') {
        socket.data.anonymous = true;
        return next();
      }

      throw new Error('Invalid JWT token');
    }

    const { sub } = VerifyAndToken.value;

    socket.data.userId = sub;

    return next();
  } catch {
    if (token === 'Anonymous') {
      socket.data.anonymous = true;
      return next();
    }

    throw new Error('Invalid JWT token');
  }
}
