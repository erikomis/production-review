import { Router } from 'express';
import { FinalizeRegistrationController } from '~/modules/auth/useCases/finalizeRegistration/FinalizeRegistration.Controller';
import { LoginController } from '~/modules/auth/useCases/login/Login.Controller';
import { RegisterController } from '~/modules/auth/useCases/register/Register.Controller';
const routerAuth = Router();
const loginController = new LoginController();
const registerController = new RegisterController();
const finalize = new FinalizeRegistrationController();

routerAuth.post('/login', loginController.login);
routerAuth.post('/register', registerController.execute);
routerAuth.post('/finalize', finalize.execute);

export default routerAuth;
