import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenService } from './RefreshToken.Service';

export class RefreshTokenController {
  public async handle(req: Request, res: Response) {
    const refresh_token =
      req.body.token || req.headers['x-access-token'] || req.query.token;
    const auth = container.resolve(RefreshTokenService);
    const authToken = auth.execute(refresh_token);

    return res.status(200).json({ authToken });
  }
}
