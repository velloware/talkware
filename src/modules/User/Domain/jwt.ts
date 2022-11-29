import { sign, verify } from 'jsonwebtoken';
import jwtConfig from '../../../shared/Config/jwt/auth';
import { Either, left, right } from '../../../core/logic/Either';
import { InvalidJWTTokenError } from './Errors/InvalidJWTTokenError';
import { User } from './User';

interface JWTData {
  userId: string;
  token: string;
}

export interface JWTTokenPayload {
  exp: number;
  sub: string;
}

export class JWT {
  public readonly userId: string;
  public readonly token: string;

  private constructor({ userId, token }: JWTData) {
    this.userId = userId;
    this.token = token;
  }

  // public getUserId(): Either<InvalidJWTTokenError, string> {
  //   const jwtPayloadOrError = JWT.verifyAndDecodeToken(this.token)

  //   if (jwtPayloadOrError.isLeft()) {
  //     return left(jwtPayloadOrError.value)
  //   }

  //   const userId = jwtPayloadOrError.value.sub

  //   return right(userId)
  // }

  static verifyAndDecodeToken(
    token: string,
  ): Either<InvalidJWTTokenError, JWTTokenPayload> {
    try {
      const decoded = verify(token, jwtConfig.jwt.secret) as JWTTokenPayload;

      return right(decoded);
    } catch (err) {
      return left(new InvalidJWTTokenError());
    }
  }

  static createFromJWT(token: string): Either<InvalidJWTTokenError, JWT> {
    const jwtPayloadOrError = this.verifyAndDecodeToken(token);

    if (jwtPayloadOrError.isLeft()) {
      return left(jwtPayloadOrError.value);
    }

    const jwt = new JWT({ token, userId: jwtPayloadOrError.value.sub });

    return right(jwt);
  }

  static signUser(user: User): JWT {
    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    const jwt = new JWT({ userId: user.id, token });

    return jwt;
  }
}
