import { Response, Request } from 'express';
import { PrismaUsersRepository } from '../../../../../repositories/prisma/UsersRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { Authenticator } from '../../../AuthenticateUser';

export default class CreateUserController {
  public async execute(request: Request, response: Response) {
    const bodyParams = request.body;

    if (!bodyParams) {
      throw new AppError('Your request Body is invalid');
    }

    if (!bodyParams.email) {
      throw new AppError(`Email is proprety required ${bodyParams.email}`);
    }

    if (!bodyParams.password) {
      throw new AppError(
        `Password is proprety required ${bodyParams.password}`,
      );
    }

    request.debug(`User Try Auth -> Id = ${bodyParams.email}`);

    const userAuth = await new Authenticator(
      new PrismaUsersRepository(),
    ).authUser({
      email: bodyParams.email,
      password: bodyParams.password,
    });

    if (userAuth.isLeft()) {
      throw new AppError('Email or Password is invalid');
    }

    request.debug(`LogIn User -> Id = ${userAuth.value.token}`);

    return response.json({
      message: 'User Authenticated',
      token: userAuth.value.token,
    });
  }
}
