import { comparePassword, hashedPassword } from './PassCrypt';

describe('Test assCrypt', () => {
  it('Should be a create password', async () => {
    const password = await hashedPassword('password');
    const compare = await comparePassword('password', password);

    expect(password).toContain('$2b$08$');
    expect(compare).toBe(true);
  });
});
