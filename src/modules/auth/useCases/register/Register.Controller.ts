import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterService } from './Register.Service';

export class RegisterController {
  async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const auth = container.resolve(RegisterService);
    await auth.execute({ name, email, password });
    return response.status(201).json([]);
  }
}
