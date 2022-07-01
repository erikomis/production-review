import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IUserRepository } from '../../repositories/IUser.Repository';
import { IUserTokensRepository } from '../../repositories/IUserTokens.Repository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refresh_token: string;
}

@injectable()
export class LoginService {
  constructor(
    @inject('UserRepository')
    private UserRepository: IUserRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.UserRepository.findEmail(email);

    if (!user) {
      throw new ErrorApp('email or password incorrect');
    }

    if (!user.isActive) {
      throw new ErrorApp('user not active');
    }

    const passwordConfirm = await compare(password, user.password);
    if (!passwordConfirm) {
      throw new ErrorApp('email or password incorrect');
    }

    const token = sign({}, 'teste', {
      subject: user.id,
      expiresIn: '1h',
    });

    const refresh_token = sign({ email }, 'teste22', {
      subject: user.id,
      expiresIn: '12h',
    });

    await this.userTokensRepository.tokenCreate({ user_id: user.id, token });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refresh_token,
    };
  }
}
