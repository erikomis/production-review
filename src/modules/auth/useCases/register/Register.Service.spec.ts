import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { UserRepositoryInMemory } from '../../repositories/implementations/User.Repository.InMemory';
import { UserTokensRepositoryInMemory } from '../../repositories/implementations/UserTokens.Repository.InMemory';
import { RegisterController } from './Register.Controller';

let registerController: RegisterController;
let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;

describe('Register Service', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
  });
});
