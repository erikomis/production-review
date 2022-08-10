import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginService } from './Login.Service';

export class LoginController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const login = container.resolve(LoginService);
    const auth = await login.execute({ email, password });
    return response.status(200).json(auth);
  }
}
