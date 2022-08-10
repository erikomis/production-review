import { inject, injectable } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IUserRepository } from '../../repositories/IUser.Repository';
import { IUserTokensRepository } from '../../repositories/IUserTokens.Repository';

interface IRequest {
  auth: string;
}
interface IPayload {
  sub: string;
}

@injectable()
export class FinalizeRegistrationService {
  constructor(
    @inject('UserTokensRepository')
    private UserTokensRepository: IUserTokensRepository,
    @inject('UserRepository')
    private UserRepository: IUserRepository,
  ) {}
  async FinalizeRegistration({ auth }: IRequest) {
    if (!auth) {
      throw new ErrorApp('Token missing', 401);
    }

    try {
      const { sub } = verify(auth, 'teste22') as IPayload;
      const tokenExists = await this.UserTokensRepository.tokenExists(sub);
      if (!tokenExists) {
        throw new ErrorApp('token incorrect');
      }
      const id = sub;
      await this.UserRepository.activeUser({ id });
      await this.UserTokensRepository.removeToken(tokenExists.id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
