import { Email } from './Email';
import { InvalidEmailError } from './Errors/InvalidEmailError';

describe('Test Email', () => {
  it('should be a create Email isRight', () => {
    const email = Email.create('gabreilbarros13@gmail.com');

    if (email.isLeft()) {
      throw Error('email invalid');
    }

    expect(email.value).toBeInstanceOf(Email);
    expect(email.value.value).toEqual('gabreilbarros13@gmail.com');
  });

  it('should be a not create Email isLeft', () => {
    const email = Email.create('gabreilbarros13@gmail');

    if (email.isRight()) {
      throw Error('email valid');
    }

    expect(email.value.message).toEqual('CoreError > The Email(gabreilbarros13@gmail) is invalid');
    expect(email.value).toBeInstanceOf(InvalidEmailError);
  });

  it('should be a not Email valid', () => {
    expect(Email.validate('')).toEqual(false);
  });
});
