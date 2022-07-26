import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailServIce } from './SendForgotPasswordMail.Service';

export class SendForgotPasswordMailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const auth = container.resolve(SendForgotPasswordMailServIce);
    await auth.execute(email);
    return res.send();
  }
}
