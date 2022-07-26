import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IUserRepository } from '../../repositories/IUser.Repository';
import { IUserTokensRepository } from '../../repositories/IUserTokens.Repository';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ password, token }: IRequest) {
    const userToken = await this.userTokensRepository.tokenExists(token);

    if (!userToken) {
      throw new ErrorApp('token invalid!');
    }

    const user = await this.userRepository.findId(userToken.user_id);

    if (!user) {
      throw new ErrorApp('user not exists!');
    }
    const passwordHash = await hash(password, 8);

    await this.userRepository.resetPassword(user.id, passwordHash);

    await this.userTokensRepository.removeToken(userToken.id);
  }
}
