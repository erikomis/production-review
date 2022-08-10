import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { FinalizeRegistrationService } from '~/modules/auth/useCases/finalizeRegistration/FinalizeRegistration.Service';

export class FinalizeRegistrationController {
  async execute(req: Request, res: Response) {
    const auth =
      req.body.token || req.headers['x-access-token'] || req.query.token;
    const authF = container.resolve(FinalizeRegistrationService);

    await authF.FinalizeRegistration({ auth });
    return res.status(200).json();
  }
}
