import { request, response } from 'express';
import LogInUserController from './LogInUserController';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { Authenticator } from '../../../AuthenticateUser';

let logInUserController: LogInUserController;

describe('Test UseCase List AppointmentsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    logInUserController = new LogInUserController();
  });

  it('should a LoginIn user by Controller', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      email: 'mockmock@gmail.com',
      password: '331675616',
    };

    requestCurrent.debug = () => ({});

    // eslint-disable-next-line no-promise-executor-return
    const AuthenticatorSpy = jest
      .spyOn(Authenticator.prototype, 'authUser')
      .mockReturnValue(
        new Promise(resolve =>
          resolve({
            isLeft() {
              return false;
            },
            isRight() {
              return true;
            },
            value: {
              message: 'User logged in successfully',
              statusCode: 200,
              token: '123456',
              name: 'Teste',
              stack: 'Teste',
            },
          }),
        ),
      );

    jest.spyOn(response, 'json').mockReturnValue(response);

    await logInUserController.execute(requestCurrent, response);

    expect(response.json).toHaveBeenCalled();
    expect(AuthenticatorSpy).toHaveBeenCalled();
  });

  it('should a dont LoginIn user by Controller', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      email: 'mockmock@gmail.com',
      password: '331675616',
    };

    requestCurrent.debug = () => ({});

    // eslint-disable-next-line no-promise-executor-return
    jest.spyOn(Authenticator.prototype, 'authUser').mockReturnValue(
      new Promise(resolve =>
        resolve({
          isLeft() {
            return true;
          },
          isRight() {
            return false;
          },
          value: {
            message: 'User logged in successfully',
            statusCode: 200,
            token: '123456',
            name: 'Teste',
            stack: 'Teste',
          },
        }),
      ),
    );

    jest.spyOn(response, 'json').mockReturnValue(response);

    try {
      await logInUserController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it('should a dont LoginIn user by Controller. Invalid Email', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      password: '331675616',
    };

    try {
      await logInUserController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        'AppError > Email is proprety required undefined',
      );
    }
  });

  it('should a dont LoginIn user by Controller. Invalid password', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = {
      email: 'tyet@gmail.com',
    };

    try {
      await logInUserController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        'AppError > Password is proprety required undefined',
      );
    }
  });

  it('should a dont LoginIn user by Controller. Invalid Body', async () => {
    const requestCurrent = Object.create(request);

    requestCurrent.body = null;

    try {
      await logInUserController.execute(requestCurrent, response);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        'AppError > Your request Body is invalid',
      );
    }
  });
});
