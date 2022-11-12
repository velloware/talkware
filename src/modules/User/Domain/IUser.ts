import { Email } from './Email';
import { Password } from './Password';

export interface IUser {
  username: string;
  email: Email;
  password: Password;
}

export interface IUserView {
  id: string;
  username: string;
  email: string;
}