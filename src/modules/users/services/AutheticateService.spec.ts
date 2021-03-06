import 'reflect-metadata';

import AuthenticateUsersService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let createUser:CreateUserService;
let authenticateUser:AuthenticateUsersService;


describe('AuthenticateUser', () => {
  beforeEach(() =>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUsersService(fakeUsersRepository, fakeHashProvider);

  });
  it('should be able to authenticate', async () => {

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })


  it('should not be able to authenticate if non existing user', async () => {





    await expect(authenticateUser.execute({
      email: 'johndoe@exemple.com',
      password: '12345',
    })).rejects.toBeInstanceOf(AppError);
  })


  it('should not be able to authenticate with wrong password', async () => {
    
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    });


    await expect(authenticateUser.execute({
      email: 'johndoe@exemple.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError);
  })




})
