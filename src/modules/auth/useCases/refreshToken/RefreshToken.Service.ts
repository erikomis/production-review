import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IUserRepository } from '../../repositories/IUser.Repository';
import { IUserTokensRepository } from '../../repositories/IUserTokens.Repository';

interface IRequest {
  refresh_token: string;
}
interface IPayload {
  sub: string;
}

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('UserRepository')
    private UserRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ refresh_token }: IRequest) {
    const { sub } = verify(refresh_token, 'teste22') as IPayload;
    const user_id = sub;
    const userToken = await this.userTokensRepository.tokenExists(user_id);
    if (!userToken) {
      throw new ErrorApp('Refresh token error not exists!');
    }

    // token 1h
    // refre 30d

    const token = sign({}, 'teste', {
      subject: sub,
      expiresIn: '1h',
    });
    return token;
  }
}
