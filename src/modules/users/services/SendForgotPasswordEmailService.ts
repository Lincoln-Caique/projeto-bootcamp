
import { injectable, inject } from 'tsyringe';
import path from 'path';


import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/ IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailService {
  constructor(@inject('UsersRepository')
  private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private uerTokensRepository: IUserTokensRepository,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.uerTokensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs",
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      },
    });

  }
}

export default SendForgotEmailService;
