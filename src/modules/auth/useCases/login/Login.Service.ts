import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ErrorApp } from '~/infra/http/express/ErrorApp';
import { IUserRepository } from '../../repositories/IUser.Repository';

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
export class Login {
  constructor(
    @inject('UserRepository')
    private UserRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.UserRepository.findEmail(email);

    if (!user) {
      throw new ErrorApp('email or password incorrect');
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
      refresh_token,
    };
  }
}
