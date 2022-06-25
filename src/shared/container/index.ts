import { container } from 'tsyringe';
import { UserRepository } from '~/modules/auth/repositories/User.Repository';
import { IUserRepository } from '~/modules/auth/repositories/IUser.Repository';

import { UserTokensRepository } from '~/modules/auth/repositories/UserTokens.Repository';
import { IUserTokensRepository } from '~/modules/auth/repositories/IUserTokens.Repository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
