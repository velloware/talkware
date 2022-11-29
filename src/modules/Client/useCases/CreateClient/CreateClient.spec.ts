import { CreateClient } from './CreateClient';

describe('CreateClient', () => {
  it('should be able to create a new client', async () => {
    const createClient = new CreateClient();

    const client = await createClient.create({
      id: 'any_id',
      name: 'any_name',
    });

    expect(client.isRight()).toBeTruthy();
  });

  it('should not be able to create a new client with invalid name', async () => {
    const createClient = new CreateClient();

    const client = await createClient.create({
      id: '',
      name: 'name',
    });

    expect(client.isLeft()).toBeTruthy();
  });
});
