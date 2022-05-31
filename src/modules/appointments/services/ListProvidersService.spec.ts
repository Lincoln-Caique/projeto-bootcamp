import 'reflect-metadata';

import ListProvidersService from './ListProvidersService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';



let fakeUsersRepository:FakeUsersRepository;
let listProvidersService:ListProvidersService;



describe('UpdateProdfileService', () => {
  beforeEach(() =>{
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);

  })
  it('should be able to show list providers', async () => {

    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@exemple.com',
      password: '12345',
    });

    const loggerUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    const providers = await listProvidersService.execute({
      user_id: loggerUser.id,
    });

    expect(providers).toEqual([
      user1,
      user2,
    ]);

  })

});
