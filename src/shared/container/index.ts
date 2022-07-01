import { container } from 'tsyringe';
import { UserRepository } from '~/modules/auth/repositories/implementations/User.Repository';
import { IUserRepository } from '~/modules/auth/repositories/IUser.Repository';

import { UserTokensRepository } from '~/modules/auth/repositories/implementations/UserTokens.Repository';
import { IUserTokensRepository } from '~/modules/auth/repositories/IUserTokens.Repository';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMail.Provider';
import { IMailProvider } from './providers/MailProvider/IMail.Provider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  mailProvider.ethereal,
);
