import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IUserRepository } from '../../repositories/IUser.Repository';
import { IUserTokensRepository } from '../../repositories/IUserTokens.Repository';
import { resolve } from 'path';
import { IMailProvider } from '~/shared/container/providers/MailProvider/IMail.Provider';

interface IResponse {
  email: string;
  name: string;
  password: string;
}

@injectable()
export class RegisterService {
  constructor(
    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ name, email, password }: IResponse): Promise<void> {
    const emailExists = await this.userRepository.findEmail(email);

    if (emailExists) {
      throw new ErrorApp('email on exists');
    }
    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.UserCreate({
      name,
      email,
      password: passwordHash,
    });

    const token = sign({}, 'teste22', {
      subject: user.id,
      expiresIn: '12h',
    });

    await this.userTokensRepository.tokenCreate({
      user_id: user.id,
      token,
    });
    const template = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'finalizeRegistration.hbs',
    );

    const variables = {
      name: user.name,
      link: `http://localhost:3333/auth=${token}`,
    };

    await this.etherealMailProvider.sendMail(
      email,
      'Finalização de registro',
      variables,
      template,
    );
  }
}
