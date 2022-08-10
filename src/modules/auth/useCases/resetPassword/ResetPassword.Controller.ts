import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordService } from './ResetPassword.Service';

export class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token } = req.query;
    const { password } = req.body;
    const auth = container.resolve(ResetPasswordService);
    await auth.execute({ password, token: String(token) });
    return res.send();
  }
}
