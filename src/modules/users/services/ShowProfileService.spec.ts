import 'reflect-metadata';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository:FakeUsersRepository;
let showProfile:ShowProfileService;



describe('UpdateProdfileService', () => {
  beforeEach(() =>{
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);

  })
  it('should be able to show the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@exemple.com');

  })

  it('should not be able to show the profile from non-existing user', async () => {


    await expect(showProfile.execute({
      user_id: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError);

  })

});
