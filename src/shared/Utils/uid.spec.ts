import { uidCreate } from './uid';

describe('Test UID create', () => {
  it('Should be a create UID', () => {
    const uid = uidCreate();

    expect(uid).toHaveLength(36);
  });
});
