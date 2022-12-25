import { Response, Request } from 'express';
import { PrismaUsersRepository } from '../../../../../repositories/prisma/UsersRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { EditUser, IEditUser } from '../../../EditUser';

export default class EditUserController {
  public async execute(request: Request, response: Response) {
    const editUsersService = new EditUser(new PrismaUsersRepository());
    const bodyParams: IEditUser = request.body;

    if (!bodyParams) {
      throw new AppError('Your request Body is invalid', 400);
    }

    const result = await editUsersService.edit(request.user.id, bodyParams);

    if (result.isLeft()) {
      throw new AppError(`User not edited ${result.value.message}`);
    }

    request.debug(`User edited -> Id = ${result.value.id}`);

    return response.status(200).json({
      message: 'User edited',
    });
  }
}
