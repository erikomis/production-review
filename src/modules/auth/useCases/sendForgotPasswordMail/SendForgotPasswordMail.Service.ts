import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IMailProvider } from '~/shared/container/providers/MailProvider/IMail.Provider';
import { IUserRepository } from '../../repositories/IUser.Repository';
import { IUserTokensRepository } from '../../repositories/IUserTokens.Repository';
import { resolve } from 'path';

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordMailServIce {
  constructor(
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider,
    @inject('UserRepository')
    private UserRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  async execute({ email }: IRequest) {
    const user = await this.UserRepository.findEmail(email);
    if (!user) {
      throw new ErrorApp('email not exists');
    }
    const templatePath = resolve(
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );
    const token = sign({}, 'teste22', {
      subject: user.id,
      expiresIn: '12h',
    });
    await this.userTokensRepository.tokenCreate({
      user_id: user.id,
      token,
    });
    const variables = {
      name: user.name,
      link: `http://localhost:3000/password/reset?token=${token}`,
    };
    await this.etherealMailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}
