import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let createUser:CreateUserService;


describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);
  })

  it('should be able to create a new user', async () => {


    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  })


  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository,fakeHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    });

    await expect(createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '12345',
    })).rejects.toBeInstanceOf(AppError);
  })




})
