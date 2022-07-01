import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { UserRepositoryInMemory } from '../../repositories/implementations/User.Repository.InMemory';
import { UserTokensRepositoryInMemory } from '../../repositories/implementations/UserTokens.Repository.InMemory';
import { LoginService } from './Login.Service';
let loginService: LoginService;
let userRepositoryInMemory: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;

describe('Login Service', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    loginService = new LoginService(
      userRepositoryInMemory,
      userTokensRepositoryInMemory,
    );
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      email: 'martinss2@gmail.com',
      password: 'testestes',
    };
    userRepositoryInMemory.data.push({
      id: '01816325-da15-4f0e-940e-5efbfc41ff08',
      name: 'teste',
      email: 'martinss2@gmail.com',
      password: '$2a$08$72T9PnJr7.nxBThxb/1XzeAT4vqOW5tjKMqsU0xGJ9Y4lHg4pUEwq',
      isActive: true,
    });

    const response = await loginService.execute(user);
    expect(response.token).toBeTruthy();
  });

  it('should be able is user not found', async () => {
    await expect(
      loginService.execute({
        email: 'martinss2@gmail.com',
        password: 'testestes',
      }),
    ).rejects.toEqual(new ErrorApp('email or password incorrect'));
  });

  it('should be able is user not user active', async () => {
    await userRepositoryInMemory.UserCreate({
      name: 'teste',
      email: 'martinss2@gmail.com',
      password: 'teste',
    });

    await expect(
      loginService.execute({ email: 'martinss2@gmail.com', password: 'teste' }),
    ).rejects.toEqual(new ErrorApp('user not active'));
  });
});
