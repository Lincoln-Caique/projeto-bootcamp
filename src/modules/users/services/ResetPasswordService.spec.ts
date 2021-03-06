// import 'reflect-metadata';

// import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
// import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
// import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
// import AppError from '@shared/errors/AppError';
// import ResetPasswordService from './ResetPasswordService'
// import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';


// let fakeUsersRepository: FakeUsersRepository;
// let fakeMailProvider:  FakeMailProvider;
// let fakeUserTokensRepository: FakeUserTokensRepository;
// let resetPasswordService: ResetPasswordService;
// let fakeHashProvider: FakeHashProvider;
// let resetPassword: ResetPasswordService;


// describe('ResetPasswordService', () => {
//   beforeEach (() =>{
//     fakeUsersRepository = new FakeUsersRepository();
//     fakeMailProvider = new FakeMailProvider();
//     fakeUserTokensRepository = new FakeUserTokensRepository();
//     fakeHashProvider = new FakeHashProvider();

//     resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository,fakeHashProvider);
//   })

//   it('should be able to reset the password', async () => {

//     const user = await fakeUsersRepository.create({
//       name: 'John Doe',
//       email: 'johndoe@exemple.com',
//       password: '123456',
//     });

//     const {token}= await fakeUserTokensRepository.generate(user.id);

//     const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

//     await resetPasswordService.execute({
//       password: '123123',
//       token,
//     })

//     const updatedUser = await fakeUsersRepository.findById(user.id);

//     expect(generateHash).toHaveBeenCalledWith('123123');
//     expect(updatedUser?.password).toBe('123123');

//   })

//   it("should not be able to reset the password with non-existing token", async () => {
//     await expect(
//       resetPassword.execute({
//         token: 'non-existing-token',
//         password: '123456',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });

//   it("should not be able to reset the password with non-existing user", async () => {
//     const { token } = await fakeUserTokensRepository.generate(
//       "non-existing-user",
//     );

//     await expect(
//       resetPassword.execute({
//         token,
//         password: '123456',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });


// });


import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassowordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@exemple.com",
      password: "123456",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({
      password: "123123",
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: "non-existing-token",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password after two hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
